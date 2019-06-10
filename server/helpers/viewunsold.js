import Joi from 'joi';


const viewUnsold = {
    validation(statusValidation) {
        const carStatus = {
            status: Joi.string().valid('available'),
            min_price: Joi.number(),
            max_price: Joi.number()
        }

        return Joi.validate(statusValidation,carStatus);
    }
}

export default viewUnsold;