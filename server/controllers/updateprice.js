import priceValidation from '../helpers/updatePrice';
import pool from '../helpers/db/pool';

const newOrderPrice = async (req, res) => {
  const { error } = priceValidation.validation(req.body);

  if (error) {
    return res.status(400).json({
      status: 400,
      error: error.details[0].message.split('"').join(' '),
    });

  }

  const paramId = parseInt(req.params.id,10);

  const checkOrder =  await pool.query("SELECT * from orders WHERE id = $1",[paramId]);


  if (!checkOrder.rows.length) {
    return res.status(404).json({
      status: 404,
      error: 'Purchase order not found'
    });
  }

  if(checkOrder.rows[0].buyer !== req.user.id){
    return res.status(403).json({
      status:403,
      error: "Forbidden Access"
    })
  }


  if (checkOrder.rows[0].status !== 'pending') {
    return res.status(400).json({
      status: 400,
      error: 'Your order must be pending'
    });
  }


  const oldPriceOffered = parseInt(checkOrder.rows[0].amount,10);
  const newPriceOffered = parseInt(req.body.new_price,10);

  const newPrice = await pool.query("UPDATE orders SET amount = $2 WHERE id = $1",[paramId,newPriceOffered]);

    return res.status(200).json({
        status: 200,
        data: {
          id: checkOrder.rows[0].id,
          car_id: checkOrder.rows[0].car_id,
          status: checkOrder.rows[0].status,
          old_price_offered: oldPriceOffered,
          new_price_offered: newPriceOffered
        }
    });

};

export default newOrderPrice;
