import { Router, Request, Response } from 'express';
import { userInfo } from 'os';
//import { createTodo, deleteTodoById, fetchTodoById, updateTodoById } from '../repository/Todo.repo'
import { createDoctorInfo, fetchDoctorById, updateDoctorById, deleteDoctorById, listDoctor, paginatedList} from '../controllers/doctorInfo.repo';
import { isAuthenticated } from "../middlewares/isAuthentificated";
import { isAuthorized } from "../middlewares/isAuthorized";
import * as admin from 'firebase-admin';

export const DoctorInfo = Router();


//pagination

DoctorInfo.get('/', async (req:Request, res:Response) => {


    //SI NO ES Doctor NO PUEDE VER
    if(req.headers['role'] !== 'admin'){
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



DoctorInfo.get('/allDoctors', async (req: Request, res: Response) => {

    
    //SI NO ES Doctor NO PUEDE VER
    if(req.headers['role'] !== 'admin'){
        return res.status(402).send({
            error: "Not Authorized"
        })
    }


    let list = await listDoctor(false);
    

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

//Create an endpoint where an admin can create a new doctor account (user).  
DoctorInfo.post('/newDoctor', isAuthenticated, isAuthorized({roles: ['doctor'], allowSameUser:true}), async (req: Request, res: Response) => {
    const FullName: string = req.body.full_name as string;
    const UserId: string = res.locals.uid;
    const Birthdate: Date = req.body.birthdate as Date;

    console.log(res.locals)

    if (!FullName || !Birthdate || !UserId) {
        res.status(400)
        return res.send({
            message: 'Some information is missing'
        })
    }

    // Si tengo mi description
    // Debo crear un nuevo TODO y guardarlo a la DB
    const newDoctorId = await createDoctorInfo(FullName, UserId, Birthdate);

    res.status(201);
    res.send({
        newDoctorId
    })
})


DoctorInfo.get('/:doctorInfoId', async (req: Request, res: Response) => {

    const DoctorId = Number(req.params['doctorInfoId']);

    
    //SI NO ES Doctor NO PUEDE VER
    if(req.headers['role'] !== 'admin'){
        return res.status(402).send({
            error: "Not Authorized"
        })
    }


    if (DoctorId <= 0) {
        res.status(400);
        return res.send({
            error: 'Invalid id'
        })
    }

    const foundDoctor = await fetchDoctorById(DoctorId);

    if (!foundDoctor) {

        res.status(400)
        return res.send({
            error: 'Todo not found.'
        })

    }

    // TodoId es mayor a 0 y Todo con el TodoId existe en la DB
    res.status(200);
    res.send(foundDoctor);

})

//Create an endpoint that can modify the is_active property from the User model back to true. 
DoctorInfo.put('/:DoctorId', async (req: Request, res: Response) => {
    const DoctorId = Number(req.params['DoctorId']);
    const body = req.body;

    
    //SI NO ES Doctor NO PUEDE VER
    if(req.headers['role'] !== 'admin'){
        return res.status(402).send({
            error: "Not Authorized"
        })
    }


    if (DoctorId <= 0) {
        res.status(400);
        return res.send({
            error: 'Invalid id'
        })
    }

    const affectedRows = await updateDoctorById(DoctorId, body);
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

    const foundDoctor = await fetchDoctorById(DoctorId);

    res.status(200)
    return res.send(foundDoctor);
})



DoctorInfo.delete('/:DoctorId', async (req: Request, res: Response) => {
    const DoctorId = Number(req.params['DoctorId']);

    
    //SI NO ES Doctor NO PUEDE VER
    if(req.headers['role'] !== 'admin'){
        return res.status(402).send({
            error: "Not Authorized"
        })
    }

    
    if (DoctorId <= 0) {
        res.status(400);
        return res.send({
            error: 'Invalid id'
        })
    }

    const ar = await deleteDoctorById(DoctorId);

    if (!ar)  {
        return res.status(400).send({
            error: 'Cannot delete'
        })
    }

    return res.sendStatus(200);
})