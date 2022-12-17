import { Router, Request, Response } from 'express';
import { userInfo } from 'os';
//import { createTodo, deleteTodoById, fetchTodoById, updateTodoById } from '../repository/Todo.repo'
import { createPatientInfo, fetchPatientById, updatePatientById, deletePatientById, listPatient, paginatedList} from '../controllers/patientInfo.repo';

export const PatientInfo = Router();


//pagination

PatientInfo.get('/', async (req:Request, res:Response) => {


    //SI NO ES PATIENT NO PUEDE VER
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



PatientInfo.get('/allpatients', async (req: Request, res: Response) => {

    
    //SI NO ES PATIENT NO PUEDE VER
    if(req.headers['role'] !== 'patient'){
        return res.status(402).send({
            error: "Not Authorized"
        })
    }


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


PatientInfo.post('/newPatient', async (req: Request, res: Response) => {
    const FullName: string = req.body.full_name as string;
    const UserId: number = req.body.user_id as number;
    const Birthdate: Date = req.body.birthdate as Date;

    
    //SI NO ES PATIENT NO PUEDE VER
    if(req.headers['role'] !== 'patient'){
        return res.status(402).send({
            error: "Not Authorized"
        })
    }


    if (!FullName || !Birthdate) {
        res.status(400)
        return res.send({
            message: 'Some information is missing'
        })
    }

    // Si tengo mi description
    // Debo crear un nuevo TODO y guardarlo a la DB
    const newPatientId = await createPatientInfo(FullName, Birthdate);

    res.status(201);
    res.send({
        newPatientId
    })
})


PatientInfo.get('/:patienInfoId', async (req: Request, res: Response) => {

    const PatientId = Number(req.params['patienInfoId']);

    
    //SI NO ES PATIENT NO PUEDE VER
    if(req.headers['role'] !== 'patient'){
        return res.status(402).send({
            error: "Not Authorized"
        })
    }


    if (PatientId <= 0) {
        res.status(400);
        return res.send({
            error: 'Invalid id'
        })
    }

    const foundPatient = await fetchPatientById(PatientId);

    if (!foundPatient) {

        res.status(400)
        return res.send({
            error: 'Todo not found.'
        })

    }

    // TodoId es mayor a 0 y Todo con el TodoId existe en la DB
    res.status(200);
    res.send(foundPatient);

})

PatientInfo.put('/:patientId', async (req: Request, res: Response) => {
    const patientId = Number(req.params['patientId']);
    const body = req.body;

    
    //SI NO ES PATIENT NO PUEDE VER
    if(req.headers['role'] !== 'patient'){
        return res.status(402).send({
            error: "Not Authorized"
        })
    }


    if (patientId <= 0) {
        res.status(400);
        return res.send({
            error: 'Invalid id'
        })
    }

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



PatientInfo.delete('/:patientId', async (req: Request, res: Response) => {
    const patientId = Number(req.params['patientId']);

    
    //SI NO ES PATIENT NO PUEDE VER
    if(req.headers['role'] !== 'patient'){
        return res.status(402).send({
            error: "Not Authorized"
        })
    }

    
    if (patientId <= 0) {
        res.status(400);
        return res.send({
            error: 'Invalid id'
        })
    }

    const ar = await deletePatientById(patientId);

    if (!ar)  {
        return res.status(400).send({
            error: 'Cannot delete'
        })
    }

    return res.sendStatus(200);
})