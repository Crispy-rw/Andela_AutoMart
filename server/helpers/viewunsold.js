import Joi from 'joi';


const viewUnsold = {
    validation(statusValidation) {
        const carStatus = {
            status: Joi.string().valid('available')
        }

        return Joi.validate(statusValidation,carStatus);
    }
}

export default viewUnsold;