import Joi from 'joi';

const carpost = {

  validation(newCarPost) {
    const carPostValidation = {

      state: Joi.string().valid('new', 'used').required(),
      price: Joi.number().positive().min(1).max(9999999),
      manufacturer: Joi.string().required(),
      model: Joi.string().required(),
      bodyType: Joi.string().required(),

    };

    return Joi.validate(newCarPost, carPostValidation);
  },

};

export default carpost;
