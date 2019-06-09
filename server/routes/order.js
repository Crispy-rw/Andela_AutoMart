import express from 'express';
import neworder from '../controllers/order';
import auth from '../middleware/authorization';
import updatePrice from '../controllers/updateprice';


const router = express.Router();

router.post('/', auth, neworder);

router.patch('/:id/price',auth, updatePrice);

export default router;