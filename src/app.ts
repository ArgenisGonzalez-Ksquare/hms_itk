import express, { Application, Request, Response } from 'express';
import { UserRouter } from './routes/User.routes';


const app: Application = express();
app.use(express.json());


app.use('/users', UserRouter);

app.get('/', (req: Request, res: Response) => {
    res.send('VIVEEEEEEEEEEE');
})

export default app;

// A.P.I