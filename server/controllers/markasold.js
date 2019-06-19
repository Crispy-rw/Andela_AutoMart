import soldValidation from '../helpers/marksold';
import pool from  '../helpers/db/pool';


const markStatus = async (req, res) => {
    const { error } = soldValidation.validation(req.body);


    if( error ){
        return res.status(400).json({
            status:400,
            erro:error.details[0].message.split('"').join(' ')
        });
    }

    const paramIdSold = parseInt(req.params.id);

    const checkCar = await pool.query("SELECT * from cars WHERE id = $1",[paramIdSold]);

    if( !checkCar.rows.length ){
        return res.status(400).json({
            status:400,
            error: "Car id does not exist"
        });
    }

    if(checkCar.rows[0].status == 'sold'){
        return res.status(400).json({
            status: 400,
            error: "Car is already Sold"
        });
    }

    if(checkCar.rows[0].owner !== parseInt(req.user.id)){
        return res.status(403).json({
            status:403,
            error: "Access Forbidden"
        });
    }

    	const changeStatus = await pool.query("UPDATE cars SET status = 'sold' WHERE id = $1 RETURNING status",[paramIdSold]);


    return res.status(200).json({
        status:200,
        message:"Car updated successful",
        data:{
            id: checkCar.rows[0].id,
            email : req.user.email,
            created_on : checkCar.rows[0].created_on,
            manufacturer : checkCar.rows[0].manufacturer,
            model : checkCar.rows[0].model,
            price : checkCar.rows[0].price,
            state : checkCar.rows[0].state,
            status : changeStatus.rows[0].status,
        }
    });

}


export default markStatus;