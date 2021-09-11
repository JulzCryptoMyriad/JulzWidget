import React, { Component  }  from 'react'
import '../App.css';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import {ethers} from 'ethers';
import 'bootstrap/dist/css/bootstrap.min.css';


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
        itemPrice:0
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
        etherscan.getEtherPrice().then((price) => {
            this.setState({ethPrice: price});
            this.setState({itemPrice: Number(this.props.price.replace('?',''))/this.state.ethPrice});
            console.log(this.state.ethPrice, this.state.itemPrice);
        });
      }
      
      onChangeToken(e) {
        if( e.target.value === "0"){
            this.setState({ value: false });
        }else{
            this.setState({ value: true });
            this.setState({ token: e.target.value});
        }
      }

      onSubmit = async(e) => {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        await provider;

        const contract = new ethers.Contract(this.state.contract, this.state.abi, provider);
        console.log('we got a contract', contract);

        await window.ethereum.request({ method: 'eth_requestAccounts' });
        const signer = provider.getSigner();
        await signer;
        console.log('signer:',await signer.getAddress());

        const deposit = (this.state.token === "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2")? ethers.utils.parseEther(this.state.itemPrice): ethers.utils.parseEther("0");//if the token is ethers use ethers
        // if not paying with ethers
        if(this.state.token === "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2"){
            //approve transfer before transfering erc20token TODO
            console.log('deposit is eth');
        }else{
            console.log('deposit is erc20');
        }
        console.log('about to create tx');
        const tx = await contract.connect(signer).deposit(this.state.itemPrice, this.state.token, {value: deposit});
        console.log('tx:',tx);
        contract.on('Paid', (sender, amountReceived, amountDeposited, token) => {
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify( {hash: tx.hash,id: this.props.userid, sender:sender,  amountReceived:amountReceived, amountDeposited:amountDeposited, token:token})
            }

            fetch("/transaction", requestOptions)
            .then((response) => response.json())
            .then((data) =>  console.log('res',data));
        });
        await tx.wait();
      }

   render(){
           return (
        <div className="App">
            Here you will pay
            <Form>
                <Form.Group as={Row} className="mb-3" controlId="formPlaintextInfo">
                    <Form.Label column sm="2">
                    Amount to be paid (US$)
                    </Form.Label>
                    <Col sm="10">
                    <Form.Control plaintext readOnly defaultValue={this.props.price.replace('?','')} />
                    </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3" controlId="formTokenSelect">
                    <Form.Label column sm="2">
                    Token to pay with
                    </Form.Label>
                    <Col xs="auto" className="my-1">
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
                <Form.Group as={Row} className="mb-3" controlId="formPayBtn">
                    <Col xs="auto" className="my-1">
                        <Button className="align-items-center" type="submit" disabled={ !this.state.value} onClick={this.onSubmit}>Pay</Button>    
                    </Col>
                </Form.Group>
            </Form>
        </div>
    )
   }
}
