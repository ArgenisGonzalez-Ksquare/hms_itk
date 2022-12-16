import { Router, Request, Response } from 'express';
import { userInfo } from 'os';
//import { createTodo, deleteTodoById, fetchTodoById, updateTodoById } from '../repository/Todo.repo'
import { createPatientInfo, fetchPatientById, updatePatientById} from '../controllers/patientInfo.repo';

export const PatientInfo = Router();

PatientInfo.post('/newPatient', async (req: Request, res: Response) => {
    const FullName: string = req.body.FullName as string;
    const UserId: number = req.body.UserId as number;
    const Birthdate: Date = req.body.Birthdate as Date;

    if (!FullName || !UserId || !Birthdate) {
        res.status(400)
        return res.send({
            message: 'Some information is missing'
        })
    }

    // Si tengo mi description
    // Debo crear un nuevo TODO y guardarlo a la DB
    const newPatientId = await createPatientInfo(FullName, UserId, Birthdate);

    res.status(201);
    res.send({
        newPatientId
    })
})


PatientInfo.get('/:patienInfoId', async (req: Request, res: Response) => {

    const PatientId = Number(req.params['patienInfoId']);

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

/*

TodoRouter.delete('/:todoId', async (req: Request, res: Response) => {
    const todoId = Number(req.params['todoId']);
    if (todoId <= 0) {
        res.status(400);
        return res.send({
            error: 'Invalid id'
        })
    }

    const ar = await deleteTodoById(todoId);

    if (!ar)  {
        return res.status(400).send({
            error: 'Cannot delete'
        })
    }

    return res.sendStatus(200);
}) */