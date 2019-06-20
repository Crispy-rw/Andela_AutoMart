import bcrypt from 'bcrypt';
import ENV from 'dotenv';
import jwt from 'jsonwebtoken';
import { Pool } from 'pg';
import userValidation from '../helpers/signup';
import '@babel/polyfill';
import pool from  '../helpers/db/pool';


ENV.config();


const signup = async (req, res) => {


  const { error } = userValidation.validation(req.body);

  if (error) {
    return res.status(400).json({
      status: 400,
      error: error.details[0].message.split('"').join(' '),
    });
  }

  const result = await pool.query('SELECT * from users where email = $1', [req.body.email]);

  if (result.rows.length) {
    return res.status(409).json({
      status: 409,
      error: 'Your email has already been used, Please Login',
    });
  }


  const password = bcrypt.hashSync(req.body.password, 10);

  const values = [
    req.body.first_name,
    req.body.last_name,
    req.body.email,
    password,
    req.body.address,
    req.body.is_admin,
  ];

  const insertUser = await pool.query('INSERT INTO users(first_name, last_name,email, password, address, is_admin) VALUES($1, $2, $3, $4, $5, $6) RETURNING *', values);


  const payload = {
    id: insertUser.rows[0].id,
    email: insertUser.rows[0].email,
    is_admin: insertUser.rows[0].is_admin,
  };

  const token = jwt.sign(payload, process.env.JWT_SECRET_KEY, { expiresIn: '1d' });


  res.status(201).json({
    status: 201,
    message: ' User has been created successfully',
    data: {
      token,
      id: insertUser.rows[0].id,
      first_name: insertUser.rows[0].first_name,
      last_name: insertUser.rows[0].last_name,
      email: insertUser.rows[0].email,
      address: insertUser.rows[0].address,
      is_admin: insertUser.rows[0].is_admin,
    },
  });
};


export default signup;
