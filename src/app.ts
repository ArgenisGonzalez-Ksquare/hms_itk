import express, { Application, Request, Response } from 'express';
import { UserRouter } from './routes/User.routes';
import { PatientInfo } from './routes/patienInfo.routes';


const app: Application = express();
app.use(express.json());


app.use('/user', UserRouter);
app.use('/patient', PatientInfo);

app.get('/', (req: Request, res: Response) => {
    res.send('VIVEEEEEEEEEEE');
})

export default app;

// A.P.I