import ENV from 'dotenv';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import loginValidation from '../helpers/signin';
import { Pool } from 'pg';

ENV.config();

const userLogin = async (req, res) => {

  const pool = new Pool({
    connectionString: process.env.DATABASE_URL
  });


  const { error } = loginValidation.validation(req.body);

  if (error) {
    res.status(400).json({
      status: 400,
      error: error.details[0].message.split('"').join(" ")
    });

    return;
  }

  const email = req.body.email;

  const checkUser = await pool.query("SELECT * from users where email = $1",[email]);

  if (!checkUser.rows.length) {
    return res.status(400).json({

      status: 400,
      error: 'Email or password does not exist',

    });
  }

  const checkPassword = bcrypt.compareSync(req.body.password.trim(), checkUser.rows[0].password);

  if (!checkPassword) {
    return res.status(400).json({
      status: 400,
      error: 'Email or password does not exist',
    });
  }

  const loginPayload = {
    id: checkUser.rows[0].id,
    first_name: checkUser.rows[0].first_name,
    last_name: checkUser.rows[0].last_name,
    email: checkUser.rows[0].email,
    address: checkUser.rows[0].address,
    is_admin:checkUser.rows[0].is_admin
  };


  const token = jwt.sign(loginPayload, process.env.JWT_SECRET_KEY, { expiresIn: '1d' });

  res.status(200).json({
    status: 200,
    message:"Token has been created Succeddful",
    data: {
      token,
      id: checkUser.rows[0].id,
      first_name: checkUser.rows[0].first_name,
      last_name: checkUser.rows[0].last_name,
      email: checkUser.rows[0].email
    },
  });
};


export default userLogin;
