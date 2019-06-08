import express from 'express';
import neworder from '../controllers/order';
import auth from '../middleware/authorization';


const router = express.Router();

router.post('/', auth, neworder);

export default router;