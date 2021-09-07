require("dotenv").config({path:'../../.env'});
const env = process.env;

const config = {
  db: { 
    host: env.DATABASE_HOST || 'remotemysql.com',
    user: env.DATABASE_USER || '2ZE90yGC6G',
    password: env.DATABASE_PASS || 'JZFqXibSmX',
    database: env.DATABASE_NAME || '2ZE90yGC6G',
    waitForConnections: true,
    connectionLimit: env.DB_CONN_LIMIT || 2,
    queueLimit: 0,
    debug: env.DB_DEBUG || false
  },
  listPerPage: env.LIST_PER_PAGE || 10,
};
  
module.exports = config;