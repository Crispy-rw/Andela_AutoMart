import pool from './pool';   

  const dropAll = `DROP TABLE IF EXISTS users,cars,orders CASCADE`;

	   pool.query(dropAll)
      .then((res) => {
        console.log("TABLE DELETED SUCCESSFULLY");
        pool.end();
      })
      .catch((err) => {
        console.log(err);
        pool.end();
      });


