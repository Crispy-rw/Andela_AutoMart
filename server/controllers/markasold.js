import cars from '../models/car';
import soldValidation from '../helpers/marksold';


const markStatus = (req, res) => {
    const { error } = soldValidation.validation(req.body);


    if( error ){
        return res.status(400).json({
            status:400,
            erro:error.details[0].message
        });
    }

    const paramIdSold = parseInt(req.params.id);

    const checkCar = cars.find(car => car.id == paramIdSold);

    if( !checkCar ){
        return res.status(400).json({
            status:400,
            error: "Car id does not exist"
        });
    }

    if(checkCar.status == 'sold'){
        return res.status(400).json({
            status: 400,
            error: "Car is already Sold"
        });
    }

    if(checkCar.owner !== parseInt(req.user.id)){
        return res.status(400).json({
            status:401,
            error: "Unauthorized Access"
        });
    }

    checkCar.status = "sold";

    return res.status(200).json({
        status:200,
        data:{
            id: parseInt(cars.length + 1,10),
            email : req.user.email,
            created_on : checkCar.created_on,
            manufacturer : checkCar.manufacturer,
            model : checkCar.model,
            price : checkCar.price,
            state : checkCar.state,
            status : checkCar.status,
        }
    });

}


export default markStatus;