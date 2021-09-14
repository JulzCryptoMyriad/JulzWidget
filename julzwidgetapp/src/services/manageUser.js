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
  //console.log(transaction);
  //check if exists sometime the browser sends the request twice
  const exists = await db.query(
    "SELECT * FROM transactions where hash ='"+transaction.hash+"'", 
    []
  );
  if(exists.length > 0){
    return true;
  }
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