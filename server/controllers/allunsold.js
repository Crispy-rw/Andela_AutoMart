import cars from '../models/car';
import statusValidation from '../helpers/viewunsold';


const viewAllUnsold = (req, res) => {
    const { error } = statusValidation.validation(req.query);

    if( error ){
        return res.status(400).json({
            status:400,
            error: error.details[0].message
        });
    }

    const allUnsold = cars.filter(car => car.status === 'available');

    res.status(200).json({
        status:200,
        data:{ allUnsold }
    });

}


export default viewAllUnsold;