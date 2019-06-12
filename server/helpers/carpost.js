import Joi from 'joi';

const carpost = {

  validation(newCarPost) {
    const carPostValidation = {

      state: Joi.string().valid('new', 'used').required().trim(),
      price: Joi.number().positive().min(1).max(9999999),
      manufacturer: Joi.string().required().trim(),
      model: Joi.string().required().trim(),
      bodyType: Joi.string().required().trim(),

    };

    return Joi.validate(newCarPost, carPostValidation);
  },

};

export default carpost;
