import updatepostedprice from '../helpers/updatepostcarprice';
import pool from '../helpers/db/pool';
 

const newPostedPrice = async (req, res) => {
    const { error } = updatepostedprice.validation(req.body);

    if( error ) {
        return res.status(400).json({
            status: 400,
            error: error.details[0].message.split('"').join(' ')
        });
    }


    const paramId = parseInt(req.params.id);

    const checkPostedOrder = await pool.query("SELECT *from cars WHERE id = $1",[paramId]);

    if(!checkPostedOrder.rows.length){
        return res.status(404).json({
            status:404,
            error: "Id not found for the car"
        });
    }


    if(checkPostedOrder.rows[0].owner !== req.user.id){
        return res.status(403).json({
            status:403,
            error: "Access Forbidden"
        });
    }

    const saveNewPrice = await pool.query("UPDATE cars SET price = $2 WHERE id = $1 RETURNING price,id",[paramId,req.body.new_price]);

    return res.status(200).json({
        status:200,
        message:"Price updated successfully",
        data:{
            id: saveNewPrice.rows[0].id,
            email: req.user.email,
            created_on: checkPostedOrder.rows[0].created_on,
            manufacturer: checkPostedOrder.rows[0].manufacturer,
            model: checkPostedOrder.rows[0].model,
            price: saveNewPrice.rows[0].price,
            state: checkPostedOrder.rows[0].state,
            status: checkPostedOrder.rows[0].status
        }
    });


}

export default newPostedPrice;
