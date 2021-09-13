const mysql = require('mysql2/promise');
const config = require('../config');
const pool = mysql.createPool(config.db);

async function query(sql, params) {
  console.log("sql:", sql);
  const [rows, fields] = await pool.execute(sql, params);

  return rows;
}

module.exports = {
  query
}