import Joi from 'joi';


const updateCarPosted = {
    validation(pricePro) {
        const updateCarPrice = {
            new_price: Joi.number().integer().required()
        }
        return Joi.validate(pricePro,updateCarPrice);
    }
};

export default updateCarPosted;