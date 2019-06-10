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


    if(req.query.min_price == undefined && req.query.max_price == undefined){
     
        const allUnsold = cars.filter(car => car.status === 'available');

            return res.status(200).json({
                status:200,
                data:{ allUnsold }
            });

    }


    const min_price = req.query.min_price;
    const max_price = req.query.max_price;

    const selectedRange = [];
       cars.forEach((item,index) =>{
        
         if((item.status === 'available') && (item.price > min_price && item.price < max_price)){
            selectedRange.push(item);
         }
        });

    return res.status(200).json({
        status:200,
        min_price: min_price,
        max_price:max_price,
        data:{ selectedRange }
    });


}


export default viewAllUnsold;