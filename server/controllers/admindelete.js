import pool from '../helpers/db/pool';
import deleteValidation from '../helpers/admindelete';




const adminDelete = async (req, res) => {

    const { error } = deleteValidation.validation(req.params);

    if( error ) {
        return res.status(400).json({
            status:400,
            error: error.details[0].message.split('"').join(' ')
        })
    }

    if(req.user.is_admin === false){
        return res.status(403).json({
            status:403,
            error:"Forbidden Access,You are not admin"
        });
    }

    const checkId = parseInt(req.params.id,10);


    const checkCar = await pool.query("SELECT * from cars WHERE id = $1",[checkId]);

    if(!checkCar.rows.length){
        return res.status(404).json({
            status:404,
            message:"Car not found"
        });
    }

    const checkDel = await pool.query("DELETE from cars WHERE id = $1",[checkId]);


    return res.status(200).json({
        status:200,
        message:"Car deleted successfully"
    });

}


export default adminDelete;