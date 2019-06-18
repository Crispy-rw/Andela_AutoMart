import orderValidation from '../helpers/order';
import cars from '../models/car';
import orders from '../models/orders';



const newPurchaseOrder = (req, res) => {
    const { error } = orderValidation.validation(req.body);

    if( error ){
         return res.status(400).json({
                status:400,
                error: error.details[0].message
         });
    }



    const __id = parseInt(req.body.car_id);

    const checkCar = cars.find(o => o.id == __id );


        if( !checkCar ){
            return res.status(400).json({
                status:400,
                error: "Vehicle not found"
            });
        }

        if(checkCar.owner == req.user.id){
            return res.status(400).json({
                status:400,
                error:"You cant order your own car"
            });
        }


    const newOrder = {
        id: parseInt(orders.length + 1,10),
        buyer:req.user.id,
        car_id:req.body.car_id,
        amount: req.body.amount,
        status: req.body.status,
    }
 
    orders.push(newOrder);
    
    return res.status(200).json({
        status:200,
        data:{
            id: newOrder.id,
            buyer: req.user.id,
            car_id: req.body.car_id,
            price: parseFloat(checkCar.price),
            price_offered: parseFloat(req.body.amount)
        }
    });   
};

export default newPurchaseOrder;