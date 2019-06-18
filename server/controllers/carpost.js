import moment from 'moment';
import users from '../models/signup';
import carValidation from '../helpers/carpost';
import carPost from '../models/car';
import { Pool } from 'pg';



const newCarPost = async (req, res) => {

    const pool = new Pool({
      connectionString: process.env.DATABASE_URL,
    });
  
    const { error } = carValidation.validation(req.body);

    if (error) {
      return res.status(400).json({
        status: 400,
        error: error.details[0].message,
      });
    }

    const values = [
      req.user.id,
      req.body.state,
      "available",
      parseInt(req.body.price),
      req.body.manufacturer,
      req.body.model,
      req.body.bodyType,
      moment().format('LL'),
    ];

    const newVehicle = await pool.query("INSERT INTO cars (owner,state,status,price,manufacturer,body_type,model,created_on) VALUES ($1,$2,$3,$4,$5,$6,$7,$8) RETURNING * ",values);

    return res.status(201).json({
      status: 201,
      message: "Car advertisement created successfully",
      data: {
        id: newVehicle.rows[0].id,
        email: req.user.email,
        created_on: newVehicle.rows[0].created_on,
        manufacturer: newVehicle.rows[0].manufacturer,
        model: newVehicle.rows[0].model,
        price: parseInt(newVehicle.rows[0].price),
        state: newVehicle.rows[0].state,
        status: newVehicle.rows[0].status,
      }
    });

};

export default newCarPost;
