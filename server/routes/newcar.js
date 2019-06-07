import express from 'express';
import newVehicle from '../controllers/carpost';
import auth from '../middleware/authorization';


const router = express.Router();

router.post('/', auth, newVehicle);


export default router;
