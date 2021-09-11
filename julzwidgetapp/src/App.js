import './App.css';
import Button from "./components/ButtonComponent.js";
import Payment from  "./components/PaymentComponent.js";
import React, { Component } from 'react'

class App extends Component{
  state = {
    showPay : false,
    userid: window.location.toString().split('/')[3].replace('?',''),
    price: window.location.toString().split('/')[4],
  }

  onClick = () => {
    this.setState({ showPay: true })
  }

  render(){
        return (
        <div>
          { this.state.showPay ? <Payment  {...this.state}/> : <Button {...this.state} updateState={this.onClick}/> }
        </div>
      );   
  }
  
}

export default App;
