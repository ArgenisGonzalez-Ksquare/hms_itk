import { Router, Request, Response } from 'express';
import { userInfo } from 'os';
import { fetchAppointmentByDoctorId, listAppointment, paginatedList, createAppointment, updateAppointmentById, fetchAppointmentById, deleteAppointmentById, fetchAppointmentByPatientId, fetchAppointmentByDate, fetchAppointmentByIsDelete, listAppointmentForPatient, fetchAppointmentByOnlyPatientId, paginatedAllAppointments, fetchAppointmentByOrder, paginatedListDoctor } from '../controllers/appointment.repo';
import { isAuthenticated } from "../middlewares/isAuthentificated";
import { isAuthorized } from "../middlewares/isAuthorized";
import * as admin from 'firebase-admin';
import { fetchDoctorById, fetchDoctorByUID } from '../controllers/doctorInfo.repo';


export const Appointment = Router();

/* ------------------------------------------------------------------------------------
    Patient Module - Requirements
   ------------------------------------------------------------------------------------


    Create a series of endpoints that need to LIST, Read, Create and Delete appointments (DONE)
    Create pagination for this resource  (DONE)
    The delete needs to be soft (do not erase the record) (DONE)
    Only a user with the role of patient can access these endpoints. (DONE)

    ************************************************************************************
    ------------------------------------------------------------------------------------
 */

/* ************************* L I S T ****************************************** */
Appointment.get('/allAppointment', isAuthenticated, isAuthorized({roles: ['patient'], allowSameUser:true}), async (req: Request, res: Response) => {

    const appointmentId: string = res.locals.uid as string;
    console.log(appointmentId)

    
    let list = await listAppointmentForPatient(appointmentId);

    

    if (list.length === 0) {
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

/* ************************** C R E A T E ******************************************* */

Appointment.post('/newAppointment', isAuthenticated, isAuthorized({roles: ['patient'], allowSameUser:true}), async (req: Request, res: Response) => {
    
    const patientInfo_id: string = res.locals.uid;
    const doctorInfo_id: string = req.body.doctorInfo_id as string;
    const date: Date = req.body.date as Date;

    

    if (!patientInfo_id || !doctorInfo_id || !date) {
        res.status(400)
        return res.send({
            message: 'Some information is missing'
        })
    }

    const doctorExists = await fetchDoctorByUID(doctorInfo_id);

    if(doctorExists?.length === 0){
        return res.send({
            Message: 'Sorry, this doctor UID dont exits'
        })
    }

    const newApplistAppointmentId = await createAppointment(patientInfo_id, doctorInfo_id, date);

    res.status(201);
    res.send({
        newApplistAppointmentId
    })
})

/* ************************** R E A D ******************************************* */

Appointment.get('/:appointmentId', isAuthenticated, isAuthorized({roles: ['patient'], allowSameUser:true}), async (req: Request, res: Response) => {

    const appointmentId = Number(req.params['appointmentId']);
    console.log(res.locals)

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

    if(foundAppointment.patientInfo_id !== res.locals.uid){
        res.status(400).send({
            message:'This appointment ID dont belongs to you'
        })
    }

    res.status(200);
    res.send(foundAppointment);

})

/* ************************** D E L E T E ******************************************* */

Appointment.delete('/:appointmentId',  isAuthenticated, isAuthorized({roles: ['patient'], allowSameUser:true}), async (req: Request, res: Response) => {
    const appointmentId = Number(req.params['appointmentId']);

    
    if (appointmentId <= 0) {
        res.status(400);
        return res.send({
            error: 'Invalid id'
        })
    }



    const foundAppointment = await fetchAppointmentById(appointmentId);
    if(foundAppointment?.patientInfo_id === res.locals.uid){
        const ar = await deleteAppointmentById(appointmentId);

        if (!ar)  {
            return res.status(400).send({
                error: 'Cannot delete'
            })
        }
    
        return res.sendStatus(200);

    } else{
        res.send('This appointment dont belongs to you')
    }
   
})

/* ************************** P A G I N A T I O N ******************************************* */

Appointment.get('/', isAuthenticated, isAuthorized({roles: ['patient'], allowSameUser:true}), async (req:Request, res:Response) => {

    console.log('sds')
    let limit = Number(req.query['size'])
    let offset = 0 + Number(req.query['page']) - 1 * limit
    const uid = res.locals.uid;

    const list = await paginatedList(uid,limit,offset);
    
    res.status(200);
    res.send(list); 
})


/* ------------------------------------------------------------------------------------
    Doctor Module - Requirements
   ------------------------------------------------------------------------------------


    Create an endpoint that reads from the same Model created in the previous model but only returns the appointments assigned to this doctor (Done)
    Create an endpoint that allows a doctor to modify the date or time of the appointment and only that. (Done)
    Create filters that allow a doctor to get more specific information like byDate, byPatient, and orderBy=asc|desc. (Done)
    Create pagination for this resource (DONE)
    Only a user with the role of doctor can access these endpoints.  (Done)
    Any requirements of this module can change at a later stage

    ************************************************************************************
    ------------------------------------------------------------------------------------
 */

/* Create an endpoint that reads from the same Model created in the previous model but only returns the appointments assigned to this doctor */

Appointment.get('/doctor/myAppointments/', isAuthenticated, isAuthorized({roles: ['doctor'], allowSameUser:true}),async (req: Request, res: Response) => {

    const doctorId = res.locals.uid;
    const foundAppointment = await fetchAppointmentByDoctorId(doctorId);

    if (!foundAppointment) {

        res.status(400)
        return res.send({
            error: 'Appointment not found.'
        })

    }

    res.status(200);
    res.send(foundAppointment);

})


/* Create an endpoint that allows a doctor to modify the date or time of the appointment and only that. */

Appointment.put('/doctor/modifyAppointment/:appointmentId',isAuthenticated, isAuthorized({roles: ['doctor'], allowSameUser:true}), async (req: Request, res: Response) => {
    const appointmentId = Number(req.params['appointmentId']);
    const body = req.body;

    console.log(res.locals.uid)
    if (appointmentId <= 0) {
        res.status(400);
        return res.send({
            error: 'Invalid id'
        })
    }

    const affectedRows = await updateAppointmentById(res.locals.uid,appointmentId, body);
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

//Filter by Patient 

Appointment.get('/doctor/myPatientAppointments/:patientId', isAuthenticated, isAuthorized({roles: ['doctor'], allowSameUser:true}), async (req: Request, res: Response) => {

    const patientId = String(req.params['patientId']);
    
    if (Number(patientId) <= 0) {
        res.status(400);
        return res.send({
            error: 'Invalid id'
        })
    }

    const foundAppointment = await fetchAppointmentByPatientId(res.locals.uid, patientId);

    if (!foundAppointment) {

        res.status(400)
        return res.send({
            error: 'Todo not found.'
        })
    }

    res.status(200);
    res.send(foundAppointment);

})

//Filter by date 
Appointment.get('/doctor/AppointmensPerDays', isAuthenticated, isAuthorized({roles: ['doctor'], allowSameUser:true}), async (req: Request, res: Response) => {

    const date: Date = req.body.date as Date;
    if (!date) {
        res.status(400);
        return res.send({
            error: 'Invalid format for date'
        })
    }

    const foundAppointment = await fetchAppointmentByDate(res.locals.uid, date);

    if (!foundAppointment) {

        res.status(400)
        return res.send({
            error: 'Appointment not found.'
        })

    }

    res.status(200);
    res.send(foundAppointment);

})

//Filter per Order

Appointment.get('/doctor/AppointmentsOrder/', isAuthenticated, isAuthorized({roles: ['doctor'], allowSameUser:true}), async (req: Request, res: Response) => {

    const order:string =  String(req.query['order']).toUpperCase();

    
    if(order === 'DESC' || order === 'ASC'){
        const foundAppointment = await fetchAppointmentByOrder(res.locals.uid, order);

        if (!foundAppointment) {

            res.status(400)
            return res.send({
                error: 'Appointments not found.'
            })
        }

        res.status(200);
        res.send(foundAppointment);
    }

    return res.status(400).send({
            message:'Just ASC or DESC are allowed'
        })
    


})

/* ************************** P A G I N A T I O N ******************************************* */

Appointment.get('/doctor/pagination', isAuthenticated, isAuthorized({roles: ['doctor'], allowSameUser:true}), async (req:Request, res:Response) => {

    console.log(res.locals.role)
    let limit = Number(req.query['size'])
    let offset = 0 + Number(req.query['page']) - 1 * limit
    const uid = res.locals.uid;

    const list = await paginatedListDoctor(uid,limit,offset);
    
    res.status(200);
    res.send(list); 
})


/* ------------------------------------------------------------------------------------
    Admin Module - Requirements
   ------------------------------------------------------------------------------------


    Create an endpoint where an admin can create a new doctor account (user). (done) 
    Create an endpoint that can modify the is_active property from the User model back to true. (done)
    Create an endpoint that would LIST all the appointments in the table (done)
    [Appointments] Create pagination filters for the previous endpoint  (done)
    [Appointments] Create a filter where you can pass a patientId and only see the appointments of that user  (done)
    [Appointments] Create a filter where you can pass a doctorId and only see the appointments where the doctor is in charge (done)
    [Appointments] Create a filter where you can receive the information based on is_deleted property (done)
    [Appointments] Create a filter where you can modify the order of the information do this by the patientId and the doctorId 
    Any requirements of this module can change at a later stage 

    ************************************************************************************
    ------------------------------------------------------------------------------------
 */

/* ************************** P A G I N A T I O N ******************************************* */

Appointment.get('/all/PaginatedAppointment', isAuthenticated, isAuthorized({roles: ['admin'], allowSameUser:false}), async (req: Request, res: Response) => {

    let limit = Number(req.query['size'])
    let offset = 0 + Number(req.query['page']) - 1 * limit
    let boolean = Boolean(req.query['disable']);
    
    let list = await paginatedAllAppointments(limit, offset, boolean);
    
    
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


/* ************************* L I S T ****************************************** */
Appointment.get('/all/Appointment',  isAuthenticated, isAuthorized({roles: ['admin'], allowSameUser:false}), async (req: Request, res: Response) => {


    let list = await listAppointment(true);
    console.log(list)
    
    
    if (list.length === 0) {
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

//[Appointments] Create a filter where you can pass a doctorId and only see the appointments where the doctor is in charge 
Appointment.get('/AdminAppointmentsDoctors/:doctorId',  isAuthenticated, isAuthorized({roles: ['admin'], allowSameUser:false}), async (req: Request, res: Response) => {

    const doctorId = String(req.params['doctorId']);

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



//[Appointments] Create a filter where you can pass a patientId and only see the appointments of that user 
Appointment.get('/AdminAppointmentsPatients/:patientId',  isAuthenticated, isAuthorized({roles: ['admin'], allowSameUser:false}), async (req: Request, res: Response) => {
    console.log(res.locals)
    const patientId = String(req.params['patientId']);


    const foundAppointment = await fetchAppointmentByOnlyPatientId(patientId);

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


//[Appointments] Create a filter where you can receive the information based on is_deleted property 
Appointment.get('/admin/DeletesAppointment/',  isAuthenticated, isAuthorized({roles: ['admin'], allowSameUser:false}), async (req: Request, res: Response) => {
    console.log(res.locals)
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





