import express from 'express';
import signup from '../controllers/signup';


const router = express.Router();

router.post('/api/v1/auth/signup', signup);

export default router;
