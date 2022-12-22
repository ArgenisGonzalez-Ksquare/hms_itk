import { Router, Request, Response } from 'express';
import { userInfo } from 'os';
import { createPatientInfo, fetchPatientById, updatePatientById, deletePatientById, listPatient, paginatedList} from '../controllers/patientInfo.repo';
import { isAuthenticated } from "../middlewares/isAuthentificated";
import { isAuthorized } from "../middlewares/isAuthorized";
import * as admin from 'firebase-admin';

export const PatientInfo = Router();


//pagination

PatientInfo.get('/',  isAuthenticated, isAuthorized({roles: ['admin'], allowSameUser:false}),async (req:Request, res:Response) => {

    let limit = Number(req.query['size'])
    let offset = 0 + Number(req.query['page']) - 1 * limit

    console.log(limit, offset)
    const list = await paginatedList(limit,offset);
 
    res.status(200);
    res.send(list); 
})



PatientInfo.get('/allpatients',  isAuthenticated, isAuthorized({roles: ['admin'], allowSameUser:false}), async (req: Request, res: Response) => {

    let list = await listPatient(false);

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


PatientInfo.post('/newPatient', isAuthenticated, isAuthorized({roles: ['patient'], allowSameUser:true}), async (req: Request, res: Response) => {
    const FullName: string = req.body.full_name as string;
    const UserId: string = res.locals.uid;
    const Birthdate: Date = req.body.birthdate as Date;

    console.log(UserId);
    
    if (!FullName || !Birthdate || !UserId) {
        res.status(400)
        return res.send({
            message: 'Some information is missing'
        })
    }

    const newPatientId = await createPatientInfo(FullName, UserId,  Birthdate);

    res.status(201);
    res.send({
        newPatientId
    })
})


PatientInfo.get('/:patienInfoId',  isAuthenticated, isAuthorized({roles: ['admin', 'patient'], allowSameUser:true}), async (req: Request, res: Response) => {

    const PatientId = Number(req.params['patienInfoId']);
    const foundPatient = await fetchPatientById(PatientId);

    if (!foundPatient) {

        res.status(400)
        return res.send({
            error: 'Patient not found.'
        })

    }

    res.status(200);
    res.send(foundPatient);

})

PatientInfo.put('/:patientId',  isAuthenticated, isAuthorized({roles: ['admin', 'patient'], allowSameUser:true}), async (req: Request, res: Response) => {
    const patientId = Number(req.params['patientId']);
    const body = req.body;

    const affectedRows = await updatePatientById(patientId, body);
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

    const foundPatient = await fetchPatientById(patientId);

    res.status(200)
    return res.send(foundPatient);
})



PatientInfo.delete('/:patientId', isAuthenticated, isAuthorized({roles: ['admin', 'patient'], allowSameUser:true}), async (req: Request, res: Response) => {
    const patientId = Number(req.params['patientId']);
    const ar = await deletePatientById(patientId);

    if (!ar)  {
        return res.status(400).send({
            error: 'Cannot delete'
        })
    }

    return res.sendStatus(200);
})