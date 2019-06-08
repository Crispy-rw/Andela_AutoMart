import Joi from 'joi';


const order = {
    validation(newPurchaseOrder){
        const orderValidateion = {

            buyer: Joi.number().integer().max(2),
            car_id: Joi.number().integer().max(9999).required().min(0),
            amount:Joi.number().integer().required().max(99999999999999999).min(0),
            status: Joi.string().valid('pending','accepted','ignored').required(),

        };

        return Joi.validate(newPurchaseOrder,orderValidateion);
    },
};


export default order;