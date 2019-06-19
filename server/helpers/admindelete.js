import Joi from 'joi';


const deleteCar = {
        validation(carId){
          const deleteValidateion = {
            id: Joi.number().integer().max(9999).min(0)
          };

        return Joi.validate(carId,deleteValidateion);
    },
};


export default deleteCar;