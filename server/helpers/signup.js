import Joi from 'joi';


const register = {

  validation(user) {
    const uservalidation = {
      first_name: Joi.string().min(2).max(20).required(),
      last_name: Joi.string().min(2).max(20).required(),
      email: Joi.string().email().required(),
      password: Joi.string().min(8).max(12).required(),
      is_admin: Joi.boolean(),
      address: Joi.string().required().max(20),
    };

    return Joi.validate(user, uservalidation);
  },

};


export default register;
