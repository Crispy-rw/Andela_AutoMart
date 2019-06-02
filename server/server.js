import express from 'express';
import bodyParser from 'body-parser';
import signupRouter from './routes/signup';


const app = express();
app.use(express.json());

app.use(bodyParser.json());

app.use('/', signupRouter);

const port = process.env.PORT || 5101;

app.listen(port, () => { console.log(`Port Connected to: ${port}`); });
