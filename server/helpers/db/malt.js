const { Pool } = require('pg');
const dotenv = require('dotenv');


dotenv.config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL
});

pool.on('connect', () => {
  console.log('connected to the db');
});



const createMalt = () => {

  const queryText = `CREATE DATABASE malt`;

	pool.query(queryText)
    .then((res) => {
      pool.end();
    })
    .catch((err) => {
      pool.end();
    });

}



export default createMalt();
