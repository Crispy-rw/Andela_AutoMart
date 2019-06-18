import pool from '../helpers/db/pool';

const viewCar = async (req, res) => {

    const paramId = parseInt(req.params.id);

    const checkCar = await pool.query("SELECT * from cars WHERE id = $1",[paramId]);

    if(!checkCar.rows.length){
        return res.status(404).json({
            status:404,
            error: "Car not found"
        });
    }


    if(checkCar.rows[0].owner !== parseInt(req.user.id)){
        return res.status(403).json({
            status:403,
            error: " Unauthorized Access "
        });
    }


    return res.status(200).json({
        status:200,
        message:"Car found successfully",
        data:{
            id:checkCar.rows[0].id,
            owner: checkCar.rows[0].owner,
            created_on: checkCar.rows[0].created_on,
            state: checkCar.rows[0].state,
            price: checkCar.rows[0].price,
            status: checkCar.rows[0].status,
            manufacturer: checkCar.rows[0].manufacturer,
            model: checkCar.rows[0].model,
            body_type:checkCar.rows[0].body_type
        }
    });

}


export default viewCar;