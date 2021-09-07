const db = require('../services/db');
const {ethers} = require('hardhat');


async function getUser(id){
  const data = await db.query("SELECT * FROM users where idusers ="+id+"");
  const meta = {page: 1};
    console.log('got for that user', data);
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