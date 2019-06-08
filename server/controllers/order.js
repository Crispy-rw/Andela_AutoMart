import order from '../models/orders';
import users from '../models/signup';
import orderValidation from '../helpers/order';
import car from '../models/car';


const newPurchaseOrder = (req, res) => {
    const { error } = orderValidation.validation(req.body);

    if( error ){
         return res.status(400).json({
                status:400,
                error: error.details[0].message
         });
    }

    const checkCar = car.find(car => car.id === req.body.car_id);

        if( !checkCar ){
            return res.status(400).json({
                status:400,
                error: "Vehicle does not exist"
            });
        }


    const orderId = parseInt(car.length + 1,10);

    const newOrder = {
        id:orderId,
        buyer:req.user.id,
        car_id:req.body.car_id,
        amount: req.body.amount,
        status: req.body.status,
    }
 
    order.push(newOrder);

    console.log(newOrder);
    
};

export default newPurchaseOrder;