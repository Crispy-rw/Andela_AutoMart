import express from 'express';
import newVehicle from '../controllers/carpost';
import auth from '../middleware/authorization';
import markSold from '../controllers/markasold';


const router = express.Router();

router.post('/', auth, newVehicle);

router.patch('/:id/status', auth, markSold);

export default router;
