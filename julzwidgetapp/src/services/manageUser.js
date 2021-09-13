const db = require('../services/db');

async function getUser(body){

  const data = await db.query("SELECT *, CAST(abi as CHAR) charABI FROM users where idusers ="+body.id+"");
  const meta = {page: 1};
  return {
    data,
    meta
  }
}

async function saveTransaction(transaction){
  console.log(transaction);
    const result = await db.query(
      "INSERT INTO transactions(hash, idusers, date, amount, success) VALUE('"+transaction.hash+"',"+transaction.id+",sysdate(),"+transaction.amountDeposited+", true)", 
      []
    );
      let message =  false;
    
      if (result.affectedRows) {
        message = true;
      }
    
      return message;

  }

module.exports = {
  getUser,
  saveTransaction
}