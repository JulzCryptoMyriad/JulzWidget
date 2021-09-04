import './App.css';
import Button from "./components/ButtonComponent.js";
import Payment from  "./components/PaymentComponent.js";
import React, { Component ,useState } from 'react'

class App extends Component{
  state = {
    showPay : false
  }

  onClick = () => {
    this.setState({ showPay: true })
  }

  render(){
        return (
        <div>
          { this.state.showPay ? <Payment /> : <Button showPay={this.state.showPay} updateState={this.onClick}/> }
        </div>
      );   
  }
  
}

export default App;
