import ENV from 'dotenv';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import loginValidation from '../helpers/signin';
import users from '../models/signup';

ENV.config();

const userLogin = (req, res) => {
  const { error } = loginValidation.validation(req.body);

  if (error) {
    res.status(400).json({
      status: 400,
      error: error.details[0].message,
    });

    return;
  }

  const checkUser = users.find(user => user.email === req.body.email);

  if (!checkUser) {
    return res.status(400).json({
      status: 400,
      error: 'Email or password does not exist',

    });
  }

  const checkPassword = bcrypt.compareSync(req.body.password.trim(), checkUser.password);

  if (!checkPassword) {
    return res.status(400).json({
      status: 400,
      error: 'Email or password does not exist',
    });
  }

  const loginPayload = {
    id: checkUser.id,
    first_name: checkUser.first_name,
    last_name: checkUser.last_name,
    email: checkUser.email,
    address: checkUser.address,
    is_admin:checkUser.is_admin
  };


  const token = jwt.sign(loginPayload, process.env.JWT_SECRET_KEY, { expiresIn: '1d' });

  res.status(200).json({
    status: 200,
    data: {
      token,
      id:checkUser.id,
      first_name: checkUser.first_name,
      last_name: checkUser.last_name,
      email: checkUser.email,
    },
  });
};


export default userLogin;
