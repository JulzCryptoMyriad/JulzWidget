const db = require('../services/db');
const manageContract = require('./manageContract')

async function getUser(body){

  const data = await db.query("SELECT * FROM users where idusers ="+body.id+"");
  const meta = {page: 1};
  //get contract by that user
  const contract = await manageContract.getContract(data.contractAddress);
  return {
    data,
    meta
  }
}

async function saveTransaction(transaction){
    const data = await db.query(
        "", 
        [ ]
      );
      let message =  false;
    
      if (data.length > 0) {
        message = true;
      }
    
      return {data};

  }

module.exports = {
  getUser,
  saveTransaction
}