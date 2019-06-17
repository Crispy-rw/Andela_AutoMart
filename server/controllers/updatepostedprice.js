import carPosted from '../models/car';
import updatepostedprice from '../helpers/updatepostcarprice';


const newPostedPrice = (req, res) => {
    const { error } = updatepostedprice.validation(req.body);

    if( error ) {
        return res.status(400).json({
            status: 400,
            error: error.details[0].message
        });
    }


    const paramId = parseInt(req.params.id);

    const checkPostedOrder = carPosted.find(posted => posted.id == paramId);

    if(!checkPostedOrder){
        return res.status(400).json({
            status:400,
            error: "Invalid car Posted"
        });
    }


    if(checkPostedOrder.owner !== req.user.id){
        return res.status(403).json({
            status:403,
            error: "Access Forbidden"
        });
    }

    checkPostedOrder.price = parseInt(req.body.new_price,10);

    return res.status(200).json({
        status:200,
        data:{
            id:checkPostedOrder.id,
            email: req.user.email,
            created_on: checkPostedOrder.created_on,
            manufacturer: checkPostedOrder.manufacturer,
            model: checkPostedOrder.model,
            price: checkPostedOrder.price,
            state: checkPostedOrder.state,
            status: checkPostedOrder.status
        }
    });


}

export default newPostedPrice;
