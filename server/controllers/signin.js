import ENV from 'dotenv';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { Pool } from 'pg';
import loginValidation from '../helpers/signin';
import pool from  '../helpers/db/pool';



ENV.config();

const userLogin = async (req, res) => {

  // const pool = new Pool({
  //   connectionString: process.env.DATABASE_URL,
  // });


  const { error } = loginValidation.validation(req.body);

  if (error) {
    return res.status(400).json({
      status: 400,
      error: error.details[0].message.split('"').join(' '),
    });

  }

  const { email } = req.body;

  const checkUser = await pool.query('SELECT * from users where email = $1', [email]);

  if (!checkUser.rows.length) {
    return res.status(404).json({

      status: 404,
      error: 'Email or password does not exist',

    });
  }

  const checkPassword = bcrypt.compareSync(req.body.password.trim(), checkUser.rows[0].password);

  if (!checkPassword) {
    return res.status(404).json({
      status: 404,
      error: 'Email or password does not exist',
    });
  }

  const loginPayload = {
    id: checkUser.rows[0].id,
    email: checkUser.rows[0].email,
    is_admin: checkUser.rows[0].is_admin,
  };


  const token = jwt.sign(loginPayload, process.env.JWT_SECRET_KEY, { expiresIn: '1d' });

  res.status(200).json({
    status: 200,
    message: 'User logged in successfully',
    data: {
      token,
      id: checkUser.rows[0].id,
      first_name: checkUser.rows[0].first_name,
      last_name: checkUser.rows[0].last_name,
      email: checkUser.rows[0].email,
    },
  });
};


export default userLogin;
