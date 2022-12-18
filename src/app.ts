import express, { Application, Request, Response } from 'express';
import { User, UserRouter } from './routes/User.routes';
import { PatientInfo } from './routes/patienInfo.routes';
import { Department } from './routes/department.routes';
import { DoctorInfo } from './routes/doctorInfo.routes';
import { Appointment } from './routes/appointment.routes'


const app: Application = express();
app.use(express.json());


app.use('/user', UserRouter, User);
app.use('/patient', PatientInfo);
app.use('/department', Department);
app.use('/doctor', DoctorInfo);
app.use('/appointment', Appointment);

app.get('/', (req: Request, res: Response) => {
    res.send('VIVEEEEEEEEEEE');
})

export default app;

// A.P.I