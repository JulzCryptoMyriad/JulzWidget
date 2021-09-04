import '../App.css';
import BSButton from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { Component } from 'react'

export default class Button extends Component {
    render(){
            return (
            <div className="App">
            <BSButton variant="primary" size="lg" active  onClick={() => this.props
                .updateState()}>
                Pay with Julz
            </BSButton>{' '}
        </div>
        )
    }
}
