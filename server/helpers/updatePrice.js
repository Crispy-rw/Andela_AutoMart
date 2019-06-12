import Joi from 'joi';


const updateOrder = {
  validation(newPriceUpdate) {
    const priceValidation = {
      new_price: Joi.number().positive().min(1).max(999999999999)
    };

    return Joi.validate(newPriceUpdate, priceValidation);
  },
};

export default updateOrder;
