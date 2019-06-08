import moment from 'moment';
import users from '../models/signup';
import carValidation from '../helpers/carpost';
import carPost from '../models/car';


const newCarPost = (req, res) => {
  const { error } = carValidation.validation(req.body);

  if (error) {
    return res.status(400).json({
      status: 400,
      error: error.details[0].message,
    });
  }


  const realUser = users.find(user => user.id === req.user.id);

  if (!realUser) {
    return res.status(400).json({
      status: 400,
      error: 'Invalid User',
    });
  }


  const carId = parseInt(carPost.length + 1, 10);


  const newVehicle = {
    id: carId,
    owner: req.user.id,
    created_on: moment().format('LL'),
    state: req.body.state,
    price: req.body.price,
    manufacturer: req.body.manufacturer,
    model: req.body.model,
    body_type: req.body.bodytype,
  };

  carPost.push(newVehicle);

  return res.status(201).json({
    status: 201,
    data: {
      id: newVehicle.id,
      email: realUser.email,
      created_on: moment().format('LL'),
      manufacturer: newVehicle.manufacturer,
      model: newVehicle.model,
      price: newVehicle.price,
      state: newVehicle.state,
      status: newVehicle.status,
    },
  });
};

export default newCarPost;
