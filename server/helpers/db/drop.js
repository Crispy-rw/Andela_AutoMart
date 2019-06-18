const { Pool } = require('pg');
const dotenv = require('dotenv');


dotenv.config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL
});

pool.on('connect', () => {
  console.log('connected to the db');
});

   

const dropAllTable = () => {

  const dropAll = `DROP TABLE IF EXISTS users,cars,films,flags,orders CASCADE`;

	pool.query(dropAll)
    .then((res) => {
      console.log(res);
      pool.end();
    })
    .catch((err) => {
      console.log(err);
      pool.end();
    });

}



require('make-runnable');


export default dropAllTable();
