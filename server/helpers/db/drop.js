const pool = require('./pool.js');
   

  const dropAll = `DROP TABLE IF EXISTS users,cars,films,orders CASCADE`;

	   pool.query(dropAll)
      .then((res) => {
        console.log(res);
        pool.end();
      })
      .catch((err) => {
        console.log(err);
        pool.end();
      });


