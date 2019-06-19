import statusValidation from '../helpers/viewunsold';
import pool from '../helpers/db/pool';


const viewAllUnsold = async (req, res) => {

    const { error } = statusValidation.validation(req.query);

    if( error ){
        return res.status(400).json({
            status:400,
            error: error.details[0].message.split('"').join(' ')
        });
    }

    const carsForAdmin = await pool.query("SELECT * from cars");

    if(req.user.is_admin === true){

        return res.status(200).json({
            status:200,
            message:"Cars for admin found successfully",
            data: carsForAdmin.rows
        });
    }



    if((req.query.min_price == undefined || req.query.max_price == undefined) && (req.query.status == 'available')){
     
        const UserAllUnsold = await pool.query("SELECT * from cars WHERE status = 'available'",[req.user.id]);

            return res.status(200).json({
                status:200,
                message:"All cars that are available found successfully",
                data: UserAllUnsold.rows 
            });

    }


    const min_price = req.query.min_price;
    const max_price = req.query.max_price;

    const selectedRange = await pool.query("SELECT * from cars WHERE price >= $1 AND price <= $2 AND owner = $3",[min_price,max_price,req.user.id]);

    return res.status(200).json({
        status:200,
        message:`All cars within  ${min_price} and ${max_price} found successfully`,
        data: selectedRange.rows 
    });


}


export default viewAllUnsold;