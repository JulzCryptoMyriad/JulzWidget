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
    const result = await db.query(
      "INSERT INTO transactions(hash, iduserd, date, amount, success) VALUE('"+transaction.hash+"',"+transaction.id+",sysdate(),"+transaction.amountReceived+", true)", 
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