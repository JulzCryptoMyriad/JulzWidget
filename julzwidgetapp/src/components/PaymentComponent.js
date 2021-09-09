import React, { Component  }  from 'react'
import '../App.css';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';


export default class Payment extends Component {
    state = {
        value : false,
        contract: "",
        requestOptions : {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify( {id: this.props.userid})
        }
      }

      async componentDidMount() {
        const result = fetch("/users", this.state.requestOptions)
        .then(async (res) => await res.json())
        .then((data) =>  {return data.data[0].contractAddress});
        await result
        if(result){
            this.setState({contract: result});
        }else{
            console.log('found');
        } 
        console.log('result0', this.state.contract);
      }
      async componentDidUpdate() {

        const result = fetch("/users", this.state.requestOptions)
        .then(async (res) => await res.json())
        .then((data) =>  console.log('res',data));
        await result
        if(result){
            console.log(' quien not found');
        }else{
            console.log('found');
        } 
      }

      onChangeToken(e) {
        console.log(e.target.value,'im comming here');
        if( e.target.value === "0"){
            this.setState({ value: false })
        }else{
            this.setState({ value: true })
        }
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
                    <Form.Control plaintext readOnly defaultValue={this.props.price} />
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
                        <Button className="align-items-center" type="submit" disabled={ !this.state.value} >Pay</Button>    
                    </Col>
                </Form.Group>
            </Form>
        </div>
    )
   }
}
