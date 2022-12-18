import { Router, Request, Response } from 'express';
import { userInfo } from 'os';
//import { createTodo, deleteTodoById, fetchTodoById, updateTodoById } from '../repository/Todo.repo'
import { fetchAppointmentByDoctorId, listAppointment, paginatedList, createAppointment, updateAppointmentById, fetchAppointmentById, deleteAppointmentById, fetchAppointmentByPatientId, fetchAppointmentByDate, fetchAppointmentByIsDelete } from '../controllers/appointment.repo';

export const Appointment = Router();


//Create pagination for this resource
//[Appointments] Create pagination filters for the previous endpoint 

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


//Create a series of endpoints that need to LIST, Read, Create and Delete appointments 
//Create an endpoint that would LIST all the appointments in the table 
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

    
    //Only a user with the role of patient can access these endpoints. 
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

    
    //Only a user with the role of patient can access these endpoints. 
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
            error: 'Appointment not found.'
        })

    }

    // TodoId es mayor a 0 y Todo con el TodoId existe en la DB
    res.status(200);
    res.send(foundAppointment);

})

//Create an endpoint that reads from the same Model created in the previous model but only returns the appointments assigned to this doctor 
Appointment.get('/doctorAppointments/:doctorId', async (req: Request, res: Response) => {

    const doctorId = String(req.params['doctorId']);

    
    //Only a user with the role of doctor can access these endpoints. 
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
            error: 'Appointment not found.'
        })

    }

    // TodoId es mayor a 0 y Todo con el TodoId existe en la DB
    res.status(200);
    res.send(foundAppointment);

})

Appointment.get('/AdminAppointmentsDoctors/:doctorId', async (req: Request, res: Response) => {

    const doctorId = String(req.params['doctorId']);

    
    //Only a user with the role of doctor can access these endpoints. 
    if(req.headers['role'] !== 'admin'){
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
            error: 'Appointment not found.'
        })

    }

    // TodoId es mayor a 0 y Todo con el TodoId existe en la DB
    res.status(200);
    res.send(foundAppointment);

})





//Filter by Patient 
Appointment.get('/PatientAppointments/:patientId', async (req: Request, res: Response) => {

    const patientId = String(req.params['patientId']);
    let recieveRole = req.headers['role'];

    //Only a user with the role of doctor can access these endpoints. 
    if(recieveRole !== 'doctor'){
        return res.status(401).send({
            error: "Not Authorized"
        })
    }

    if (Number(patientId) <= 0) {
        res.status(400);
        return res.send({
            error: 'Invalid id'
        })
    }

    const foundAppointment = await fetchAppointmentByPatientId(patientId);

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

//[Appointments] Create a filter where you can pass a patientId and only see the appointments of that user 
Appointment.get('/AdminAppointmentsPatients/:patientId', async (req: Request, res: Response) => {

    const patientId = String(req.params['patientId']);
    let recieveRole = req.headers['role'];

    //Only a user with the role of doctor can access these endpoints. 
    if(recieveRole !== 'admin'){
        return res.status(401).send({
            error: "Not Authorized"
        })
    }

    if (Number(patientId) <= 0) {
        res.status(400);
        return res.send({
            error: 'Invalid id'
        })
    }

    const foundAppointment = await fetchAppointmentByPatientId(patientId);

    if (!foundAppointment) {

        res.status(400)
        return res.send({
            error: 'Appointment not found.'
        })
    }

    // TodoId es mayor a 0 y Todo con el TodoId existe en la DB
    res.status(200);
    res.send(foundAppointment);

})


//Filter by date 
Appointment.get('/DateAppointment/putDate', async (req: Request, res: Response) => {

    const date: Date = req.body.date as Date;

    
    //Only a user with the role of doctor can access these endpoints. 
    if(req.headers['role'] !== 'doctor'){
        return res.status(401).send({
            error: "Not Authorized"
        })
    }


    if (!date) {
        res.status(400);
        return res.send({
            error: 'Invalid format for date'
        })
    }

    const foundAppointment = await fetchAppointmentByDate(date);

    if (!foundAppointment) {

        res.status(400)
        return res.send({
            error: 'Appointment not found.'
        })

    }

    // TodoId es mayor a 0 y Todo con el TodoId existe en la DB
    res.status(200);
    res.send(foundAppointment);

})


Appointment.get('/admin/DeletesAppointment/', async (req: Request, res: Response) => {

    //Only a user with the role of admin can access these endpoints. 
    if(req.headers['role'] !== 'admin'){
        return res.status(401).send({
            error: "Not Authorized"
        })
    }


    const foundAppointment = await fetchAppointmentByIsDelete(false);

    if (!foundAppointment) {

        res.status(400)
        return res.send({
            error: 'Appointments not found.'
        })

    }

    // TodoId es mayor a 0 y Todo con el TodoId existe en la DB
    res.status(200);
    res.send(foundAppointment);

})


//Create an endpoint that allows a doctor to modify the date or time of the appointment and only that. 
Appointment.put('/:appointmentId', async (req: Request, res: Response) => {
    const appointmentId = Number(req.params['appointmentId']);
    const body = req.body;

    
    //SOnly a user with the role of doctor can access these endpoints. 
    if(req.headers['role'] !== 'doctor'){
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


//The delete needs to be soft (do not erase the record) 
Appointment.delete('/:appointmentId', async (req: Request, res: Response) => {
    const appointmentId = Number(req.params['appointmentId']);

    
    //Only a user with the role of patient can access these endpoints. 
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

    const ar = await deleteAppointmentById(appointmentId);

    if (!ar)  {
        return res.status(400).send({
            error: 'Cannot delete'
        })
    }

    return res.sendStatus(200);
})