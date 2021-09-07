import './App.css';
import Button from "./components/ButtonComponent.js";
import Payment from  "./components/PaymentComponent.js";
import React, { Component , useState } from 'react'

class App extends Component{
  state = {
    showPay : false,
    userid: window.location.toString().split('/')[3],
    price: window.location.toString().split('/')[4],
  }

  onClick = () => {
    this.setState({ showPay: true })
  }

  render(){
        return (
        <div>
          { this.state.showPay ? <Payment  {...this.state}/> : <Button showPay={this.state.showPay} updateState={this.onClick}/> }
        </div>
      );   
  }
  
}

export default App;
