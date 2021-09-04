import React, { Component }  from 'react'
import '../App.css';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';


export default class Payment extends Component {
    state = {
        value : false
      }

      onChangeToken(e) {
        console.log(e.target.value,'im comming here');
        if( e.target.value === "0"){
            console.log(e.target.value, 'should disable');
            this.setState({ value: false })
        }else{
            console.log(e.target.value, 'should enable');
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
                    <Form.Control plaintext readOnly defaultValue="0.00" />
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
                            <option value="ETH">ETH</option>
                            <option value="DAI">DAI</option>
                            <option value="USDC">USDC</option>
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
