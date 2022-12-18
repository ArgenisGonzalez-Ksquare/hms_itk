import { Router, Request, Response } from 'express';
import { userInfo } from 'os';
//import { createTodo, deleteTodoById, fetchTodoById, updateTodoById } from '../repository/Todo.repo'
import { fetchAppointmentByDoctorId, listAppointment, paginatedList, createAppointment, updateAppointmentById, fetchAppointmentById, deleteAppointmentById } from '../controllers/appointment.repo';

export const Appointment = Router();


//pagination

Appointment.get('/', async (req:Request, res:Response) => {


    //SI NO ES ApplistAppointment NO PUEDE VER
    if(req.headers['role'] !== 'patient'){
        return res.status(402).send({
            error: "Not Authorized"
        })
    }


    let limit = Number(req.query['size'])
    let offset = 0 + Number(req.query['page']) - 1 * limit

    console.log(limit, offset)
    const list = await paginatedList(limit,offset);
    
    res.status(200);
    res.send(list); 
})



Appointment.get('/allAppointment', async (req: Request, res: Response) => {

    
    //SI NO ES ApplistAppointment NO PUEDE VER
    if(req.headers['role'] !== 'admin'){
        return res.status(402).send({
            error: "Not Authorized"
        })
    }


    let list = await listAppointment(false);
    

    if (!list) {
        res.status(400);
        return res.send({
            error: 'Empty List'
        })
    }

    res.status(200);
    res.send({
        list
    });

})


Appointment.post('/newAppointment', async (req: Request, res: Response) => {
    const patientInfo_id: string = req.body.patientInfo_id as string;
    const doctorInfo_id: string = req.body.doctorInfo_id as string;
    const date: Date = req.body.date as Date;

    
    //SI NO ES ApplistAppointment NO PUEDE VER
    if(req.headers['role'] !== 'patient'){
        return res.status(400).send({
            error: "Not Authorized"
        })
    }


    if (!patientInfo_id || !doctorInfo_id || !date) {
        res.status(400)
        return res.send({
            message: 'Some information is missing'
        })
    }

    // Si tengo mi description
    // Debo crear un nuevo TODO y guardarlo a la DB
    const newApplistAppointmentId = await createAppointment(patientInfo_id, doctorInfo_id, date);

    res.status(201);
    res.send({
        newApplistAppointmentId
    })
})


Appointment.get('/:appointmentId', async (req: Request, res: Response) => {

    const appointmentId = Number(req.params['appointmentId']);

    
    //SI NO ES ApplistAppointment NO PUEDE VER
    if(req.headers['role'] !== 'patient'){
        return res.status(402).send({
            error: "Not Authorized"
        })
    }


    if (appointmentId <= 0) {
        res.status(400);
        return res.send({
            error: 'Invalid id'
        })
    }

    const foundAppointment = await fetchAppointmentById(appointmentId);

    if (!foundAppointment) {

        res.status(400)
        return res.send({
            error: 'Todo not found.'
        })

    }

    // TodoId es mayor a 0 y Todo con el TodoId existe en la DB
    res.status(200);
    res.send(foundAppointment);

})


Appointment.get('/doctorAppointments/:doctorId', async (req: Request, res: Response) => {

    const doctorId = String(req.params['doctorId']);

    
    //SI NO ES ApplistAppointment NO PUEDE VER
    if(req.headers['role'] !== 'doctor'){
        return res.status(401).send({
            error: "Not Authorized"
        })
    }


    if (Number(doctorId) <= 0) {
        res.status(400);
        return res.send({
            error: 'Invalid id'
        })
    }

    const foundAppointment = await fetchAppointmentByDoctorId(doctorId);

    if (!foundAppointment) {

        res.status(400)
        return res.send({
            error: 'Todo not found.'
        })

    }

    // TodoId es mayor a 0 y Todo con el TodoId existe en la DB
    res.status(200);
    res.send(foundAppointment);

})

Appointment.put('/:appointmentId', async (req: Request, res: Response) => {
    const appointmentId = Number(req.params['appointmentId']);
    const body = req.body;

    
    //SI NO ES ApplistAppointment NO PUEDE VER
    if(req.headers['role'] !== 'ApplistAppointment'){
        return res.status(402).send({
            error: "Not Authorized"
        })
    }


    if (appointmentId <= 0) {
        res.status(400);
        return res.send({
            error: 'Invalid id'
        })
    }

    const affectedRows = await updateAppointmentById(appointmentId, body);
    console.log("----------------")
    console.log(affectedRows);
    if (!affectedRows) {

        res.status(500);
        return res.send({
            error: 'Something went wrong! :)'
        })


    }

    if (affectedRows[0] === 0) {
        res.status(400);
        return res.send({
            error: 'Update failed'
        })
    }

    const foundAppointment = await fetchAppointmentById(appointmentId);

    res.status(200)
    return res.send(foundAppointment);
})



Appointment.delete('/:appointmentId', async (req: Request, res: Response) => {
    const appointmentId = Number(req.params['appointmentId']);

    
    //SI NO ES ApplistAppointment NO PUEDE VER
    if(req.headers['role'] !== 'ApplistAppointment'){
        return res.status(402).send({
            error: "Not Authorized"
        })
    }

    
    if (appointmentId <= 0) {
        res.status(400);
        return res.send({
            error: 'Invalid id'
        })
    }

    const ar = await deleteAppointmentById(appointmentId);

    if (!ar)  {
        return res.status(400).send({
            error: 'Cannot delete'
        })
    }

    return res.sendStatus(200);
})