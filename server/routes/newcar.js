import express from 'express';
import newVehicle from '../controllers/carpost';
import auth from '../middleware/authorization';
import markSold from '../controllers/markasold';
import updatePostedPrice from '../controllers/updatepostedprice';
import ViewSingleCar from '../controllers/viewsinglecar';
import viewAllUnsold from '../controllers/allunsold';
import adminDelete from '../controllers/admindelete';


const router = express.Router();

router.post('/', auth, newVehicle);

router.patch('/:id/status', auth, markSold);

router.patch('/:id/price',auth,updatePostedPrice);

router.get('/:id/',auth, ViewSingleCar);

router.get('/',auth,viewAllUnsold);

router.delete('/:id/',auth,adminDelete);

router.post('*',(req, res)=>{

    return res.status(404).json({
        status:404,
        error:"Not Found"
    });

});

export default router;
