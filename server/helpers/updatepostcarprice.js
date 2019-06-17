import Joi from 'joi';


const updateCarPosted = {
    validation(pricePro) {
        const updateCarPrice = {
            new_price: Joi.number().positive().min(1).max(999999999999).required()
        }
        return Joi.validate(pricePro,updateCarPrice);
    }
};

export default updateCarPosted;