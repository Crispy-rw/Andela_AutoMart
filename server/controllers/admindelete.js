import cars from '../models/car';

const adminDelete = (req, res) => {

    if(req.user.is_admin){
        return res.status(403).json({
            status:403,
            error:"Forbidden Access"
        });
    }

    const checkId = parseInt(req.params.id,10);

    const checkCar = cars.findIndex(car => car.id === checkId);

    if(checkCar){
        cars.splice(checkCar,1);
        return res.status(200).json({
            status:200,
            message:"Car advert succesful deleted"
        });
    }

}


export default adminDelete;