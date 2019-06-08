import Joi from 'joi';

const carpost = {

  validation(newCarPost) {
    const carPostValidation = {

      state: Joi.string().valid('new', 'used').required(),
      status: Joi.string().required().valid('sold', 'available'),
      price: Joi.number().required(),
      manufacturer: Joi.string().required(),
      model: Joi.string().required(),
      bodyType: Joi.string().required(),

    };

    return Joi.validate(newCarPost, carPostValidation);
  },

};

export default carpost;
