import pool from './pool';


   

  const createAll = `CREATE TABLE IF NOT EXISTS users(
                        id SERIAL PRIMARY KEY,
                        first_name VARCHAR(100) NOT NULL,
                        last_name VARCHAR(100) NOT NULL,
                        email VARCHAR(100) UNIQUE NOT NULL,                        
                        password VARCHAR(100) NOT NULL,
                        address VARCHAR(100) NOT NULL,
                        is_admin BOOLEAN NOT NULL DEFAULT false
                      );
                    CREATE TABLE IF NOT EXISTS cars(
                      id SERIAL PRIMARY KEY,
                      owner INT NOT NULL,
                      state VARCHAR(5) NOT NULL,
                      status VARCHAR(20) NOT NULL,
                      price INT NOT NULL,
                      manufacturer VARCHAR(20) NOT NULL,
                      model VARCHAR(20) NOT NULL,
                      body_type VARCHAR(20) NOT NULL,
                      created_on TIMESTAMP                    
                    );
                    CREATE TABLE IF NOT EXISTS orders(
                      id SERIAL PRIMARY KEY,
                      buyer INT NOT NULL,
                      car_id INT NOT NULL,
                      amount INT NOT NULL,
                      status VARCHAR(20) NOT NULL
                    )`;
                    

	pool.query(createAll)
    .then((res) => {
      pool.end();
    })
    .catch((err) => {
      pool.end();
    });
