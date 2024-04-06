const { Pool } = require('pg');
require('dotenv').config();
const PG_URI = process.env.PG_URI;
//const {Sequelize} = require('sequelize') - if start from scratch

/* create a new pool using the connection URI */
const pool = new Pool({
  connectionString: PG_URI,
});

module.exports = {
  query: (text, params, callback) => {
    console.log('Executed query', text);
    return pool.query(text, params, callback);
  },
};
