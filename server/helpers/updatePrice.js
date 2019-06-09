import Joi from 'joi';


const updateOrder = {
  validation(newPriceUpdate) {
    const priceValidation = {
      new_price: Joi.number().integer().required()
    };

    return Joi.validate(newPriceUpdate, priceValidation);
  },
};

export default updateOrder;
