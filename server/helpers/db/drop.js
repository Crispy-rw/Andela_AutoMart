import pool from './pool';   

  const dropAll = `DROP TABLE IF EXISTS users,cars,orders CASCADE`;

	   pool.query(dropAll)
      .then((res) => {
        pool.end();
      })
      .catch((err) => {
        pool.end();
      });


