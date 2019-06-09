import express from 'express';
import newVehicle from '../controllers/carpost';
import auth from '../middleware/authorization';
import markSold from '../controllers/markasold';
import updatePostedPrice from '../controllers/updatepostedprice';
import ViewSingleCar from '../controllers/viewsinglecar';
import viewAllUnsold from '../controllers/allunsold';


const router = express.Router();

router.post('/', auth, newVehicle);

router.patch('/:id/status', auth, markSold);

router.patch('/:id/price',auth,updatePostedPrice);

router.get('/:id/',auth, ViewSingleCar);

router.get('/',auth,viewAllUnsold);


export default router;