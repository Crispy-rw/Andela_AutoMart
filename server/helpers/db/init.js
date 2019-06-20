import pool from './pool';


const createvalues = `INSERT INTO users (first_name,last_name,email,password,address,is_admin) VALUES('crispy','nshimy','crispy@gmail.com','$2b$10$89BK4gc4BZwwcWLiNll87ujqkNZJq2NICdWAaZFiRkNgvhoB0Y2Sa','Rwafnda',false);
                      INSERT INTO cars (owner,created_on,state,status,price,manufacturer,model,body_type) VALUES(1,'2019-06-18 00:00:00','new','sold',200,'benz','van','2 doors');
                      INSERT INTO cars (owner,created_on,state,status,price,manufacturer,model,body_type) VALUES(2,'2019-06-18 00:00:00','new','available',400,'benz','van','2 doors');
                      INSERT INTO cars (owner,created_on,state,status,price,manufacturer,model,body_type) VALUES(10,'2019-06-18 00:00:00','new','available',400,'benz','van','2 doors');
                      INSERT INTO orders (buyer,car_id,amount,status) VALUES(1,1,2000,'accepted');
                      INSERT INTO orders (buyer,car_id,amount,status) VALUES(2,2,4000,'pending')`

                
      pool.query(createvalues)
      .then((res) => {
        pool.end();
      })
      .catch((err) => {
        pool.end();
      });                   