import Joi from 'joi';


const markAsSold = {
  validation(status) {
    const soldValidation = {
      status: Joi.string().valid('sold').required(),
    };

    return Joi.validate(status, soldValidation);
  },
};

export default markAsSold;
