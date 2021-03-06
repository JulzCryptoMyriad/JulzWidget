import React, { Component  }  from 'react'
import '../App.css';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import {Card, Spinner} from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import {ethers} from 'ethers';
import encodePath from '../services/encodePath.js'
import abi from '../services/erc20ABI'
import 'bootstrap/dist/css/bootstrap.min.css';
import CoinGecko from 'coingecko-api';


const CoinGeckoClient = new CoinGecko();

const WETH_ADDR = "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2";

export default class Payment extends Component {
    state = {
        value : false,
        contract: "",//address
        requestOptions : {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify( {id: this.props.userid})
        },
        token:"",
        abi: {},
        ethPrice:0,
        itemPrice:0,
        map: new Map(),
        showSpinner: false
    }

      async componentDidMount() {
        const result = fetch("/users", this.state.requestOptions)
        .then(async (res) => await res.json())
        .then((data) =>  {
            this.setState({contract: data.data[0].contractAddress});
            this.setState({abi: data.data[0].charABI});
            return data.data[0];
        });
        result.then();   
        const etherscan = new ethers.providers.EtherscanProvider();
        await etherscan;
        try{
            etherscan.getEtherPrice().then((price) => {
            this.setState({ethPrice: price});
            this.setState({itemPrice: Number(this.props.price.replace('?',''))/this.state.ethPrice});
            });
        }catch(err){
            //todo use coingecko then
            console.log('Something went wrong with etherscan');
        }

        let data = await CoinGeckoClient.coins.fetch('ethereum', {});
        console.log(data.data.market_data.current_price.usd);
      }
      
     async onChangeToken(e) {
        if( e.target.value === "0"){
            this.setState({ value: false });
        }else{
            try{
                this.setState({ value: true });
                this.setState({ token: e.target.value});
                let response = await CoinGeckoClient.coins.fetchCoinContractInfo( e.target.value);
                const usd = response.data.market_data.current_price.usd;
                this.setState({itemPrice: Number(this.props.price.replace('?',''))/usd});
                if(e.target.value !== "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2"){
                     const provider = new ethers.providers.Web3Provider(window.ethereum);
                    await provider;    
                    await window.ethereum.request({ method: 'eth_requestAccounts' });
                    const signer = provider.getSigner();
                    await signer;
                    console.log(await signer.getAddress(),'sig');
                    const factory = await new ethers.Contract(this.state.token, abi(), provider);
                    const erc20 = await factory.attach(this.state.token);
                    erc20.connect(signer).approve(this.state.contract, ethers.utils.parseEther(this.state.itemPrice.toString()));
                }  
            }catch(err){
                console.log(err);
            }                      
        }
      }

      onSubmit = async(e) => {
        e.preventDefault()
        this.setState({showSpinner: true});
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        await provider;

        const contract = new ethers.Contract(this.state.contract, this.state.abi, provider);
        console.log('we got a contract', contract);

        await window.ethereum.request({ method: 'eth_requestAccounts' });
        const signer = provider.getSigner();
        await signer;
        console.log('signer:',await signer.getAddress());

        const deposit = ethers.utils.parseEther(this.state.itemPrice.toString());//if the token is ethers use ethers
        console.log('this ill charge', Number(deposit));
        const ethdeposit = (this.state.token === WETH_ADDR)?ethers.utils.parseEther(this.state.itemPrice.toString()):ethers.utils.parseEther("0");
        const expetedToken = await contract.withdrawToken();

        console.log('about to create tx');
        const path = encodePath([this.state.token,expetedToken],[3000]);
        const tx = await contract.connect(signer).deposit(deposit, this.state.token, path, {value: ethdeposit});
        console.log('tx:',tx);
        contract.on('Paid', (sender, amountReceived, amountDeposited, token) => {
            console.log('deposit', ethers.utils.formatEther(Number(amountDeposited._hex).toString()));
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify( {hash: tx.hash,id: this.props.userid, sender:sender,  amountReceived:amountReceived, amountDeposited:ethers.utils.formatEther(Number(amountDeposited._hex).toString()), token:token})
            }

            fetch("/transaction", requestOptions)
            .then((response) => response.json())
            .then((data) =>  console.log('res',data));
            try{
               window.parent.postMessage("Success: "+tx.hash, "*", []);
            }catch(err){
                console.log(err);
            }           
            this.props.updateState(false);
            this.setState({showSpinner: false});
        });
        await tx.wait();
      }

   render(){
           return (
        <div className="App">
            <Card>
                <Card.Body>
                    <Form>
                        <Form.Group as={Row} className="mb-3" controlId="formPlaintextInfo">
                            <Form.Label column sm="5">
                            Amount to be paid (US$)
                            </Form.Label>
                            <Col sm="5">
                            <Form.Control plaintext readOnly defaultValue={this.props.price.replace('?','')} />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3" controlId="formTokenSelect">
                            <Form.Label column sm="5">
                            Token to pay with
                            </Form.Label>
                            <Col xs="auto" className="5">
                                <Form.Control
                                as="select"
                                custom
                                onChange={this.onChangeToken.bind(this)}
                                >
                                <option value="0">Choose...</option>
                                <option value="0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2">ETH</option>
                                <option value="0x6b175474e89094c44da98b954eedeac495271d0f">DAI</option>
                                <option value="0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48">USDC</option>
                                <option value="0x2260fac5e5542a773aa44fbcfedf7c193bc2c599">WBTC</option>
                                <option value="0xdac17f958d2ee523a2206206994597c13d831ec7">USDT</option>
                                </Form.Control>
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3" controlId="formPlaintextInfo">
                            <Form.Label column sm="5">
                            Amount of selected token to be paid
                            </Form.Label>
                            <Col sm="5">
                            <Form.Control plaintext readOnly value={this.state.itemPrice} />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3" controlId="formPayBtn">
                            <Col sm="5"></Col>
                            <Col xs="auto" >
                                    {this.state.showSpinner?                                    
                                    <Spinner animation="border" role="status">
                                      <span className="visually-hidden">Loading...</span>
                                    </Spinner>
                                    : <Button className="align-items-center" type="submit" disabled={ !this.state.value} onClick={this.onSubmit}>Pay</Button> }                                   
                            </Col>
                        </Form.Group>
                    </Form>
                </Card.Body>
            </Card>
           
        </div>
    )
   }
}
