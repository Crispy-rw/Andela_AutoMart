import priceValidation from '../helpers/updatePrice';
import orders from '../models/orders';


const newOrderPrice = (req, res) => {
  const { error } = priceValidation.validation(req.body);

  if (error) {
    return res.status(400).json({
      status: 400,
      error: error.details[0].message,
    });

  }

  const paramId = parseInt(req.params.id);

  const checkOrder = orders.find(order => order.id === paramId);


  if (!checkOrder) {
    return res.status(400).json({
      status: 400,
      error: 'Car order not found',
    });
  }

  if(checkOrder.buyer !== req.user.id){
    return res.status(400).json({
      status:400,
      error: "You are not allowed to update this order"
    })
  }


  const carStatus = checkOrder.status;

  if (carStatus !== 'pending') {
    return res.status(400).json({
      status: 400,
      error: 'Your order must be pending',
    });
  }


  const oldPriceOffered = parseInt(checkOrder.amount);
  const newPriceOffered = parseInt(req.body.new_price);

  checkOrder.price = newPriceOffered;

    return res.status(200).json({
        status: 200,
        data: {
          id: parseInt(orders.length + 1,10),
          car_id: checkOrder.car_id,
          status: carStatus,
          old_price_offered: oldPriceOffered,
          new_price_offered: parseInt(req.body.new_price)
      },
    });

};

export default newOrderPrice;
