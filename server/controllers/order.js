import orderValidation from '../helpers/order';
import pool from '../helpers/db/pool';




const newPurchaseOrder = async (req, res) => {

    const { error } = orderValidation.validation(req.body);

    if( error ){
         return res.status(400).json({
                status:400,
                error: error.details[0].message.split('"').join(' ')
         });
    }


    const car_id = parseInt(req.body.car_id);

    const checkCar = await pool.query("SELECT * from cars WHERE id = $1",[car_id]);


        if(!checkCar.rows.length){
            return res.status(404).json({
                status:404,
                error: "Vehicle not found"
            });
        }

        if(checkCar.rows[0].owner == req.user.id){
            return res.status(400).json({
                status:400,
                error:"You cant order your own car"
            });
        }


        const values = [
            req.user.id,
            req.body.car_id,
            parseInt(req.body.amount,10),
            "pending"
        ]
 
    const newOrder = await pool.query("INSERT INTO orders (buyer,car_id,amount,status) VALUES($1,$2,$3,$4) RETURNING * ",values);

    return res.status(200).json({
        status:200,
        message:"Order created successfully",
        data:{
            id: newOrder.rows[0].id,
            buyer: newOrder.rows[0].buyer,
            car_id: newOrder.rows[0].car_id,
            price: parseFloat(checkCar.rows[0].price),
            price_offered: parseFloat(req.body.amount)
        }
    });   
};

export default newPurchaseOrder;