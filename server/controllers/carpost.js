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

  var _id = 0;
  if(carPost.length == 0)  _id = 1;
  else  _id = parseInt(carPost.length + 1, 10);


  const newVehicle = {
    id: _id,
    owner: req.user.id,
    created_on: moment().format('LL'),
    state: req.body.state,
    status: "available",
    price: req.body.price,
    manufacturer: req.body.manufacturer,
    model: req.body.model,
    body_type: req.body.bodyType,
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
