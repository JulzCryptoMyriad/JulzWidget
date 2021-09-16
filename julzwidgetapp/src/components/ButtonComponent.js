import '../App.css';
import BSButton from 'react-bootstrap/Button';
import {Alert} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { Component } from 'react'

export default class Button extends Component {
    render(){
            return (
            <div className="App">
                <Alert show={this.props.paid} variant="success">
                    <Alert.Heading>The transaction was a success!</Alert.Heading>
                    <p>
                    Thanks for paying with crypto!
                    </p>
                    <hr />
                </Alert>
                <BSButton variant="primary" show={!(this.props.paid)} size="lg" active  onClick={() => this.props
                    .updateState(true)}>
                    Pay with Julz
                </BSButton>{' '}
            </div>
        )
    }
}

