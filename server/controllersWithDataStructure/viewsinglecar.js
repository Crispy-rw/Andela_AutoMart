import cars from '../models/car';


const viewCar = (req, res) => {

    const paramId = parseInt(req.params.id);

    const checkCar = cars.find(car => car.id === paramId);


    if(!checkCar){
        return res.status(400).json({
            status:400,
            error: "Invalid car Id"
        });
    }


    if(checkCar.owner !== parseInt(req.user.id)){
        return res.status(400).json({
            status:400,
            error: " Unauthorized Access "
        });
    }


    return res.status(400).json({
        status:200,
        data:{
            id:checkCar.id,
            owner: checkCar.owner,
            created_on: checkCar.created_on,
            state: checkCar.state,
            price: checkCar.price,
            status: checkCar.status,
            manifacturer: checkCar.manifacturer,
            model: checkCar.model,
            body_type:checkCar.body_type
        }
    });

}


export default viewCar;