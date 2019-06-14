import express from 'express';
import bodyParser from 'body-parser';
import signupRouter from './routes/signup';
import signin from './routes/signin';
import newCar from './routes/newcar';
import newOrder from './routes/order';
import swaggerUi from 'swagger-ui-express';
import swaggerDoc from 'swagger-node-express';


const app = express();

app.use(express.json());

app.use(bodyParser.json());

app.use('/automart', swaggerUi.serve, swaggerUi.setup(swaggerDoc));

app.use('/api/v1/auth/signup', signupRouter);

app.use('/api/v1/auth/signin',signin);

app.use('/api/v1/car',newCar);

app.use('/api/v1/order',newOrder);

const port = process.env.PORT || 5101;

app.listen(port, () => { console.log(`Port Connected to: ${port}`); });

export default app;
