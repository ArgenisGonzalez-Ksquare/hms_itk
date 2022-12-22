import { Router, Request, Response } from 'express';
import { userInfo } from 'os';
//import { createTodo, deleteTodoById, fetchTodoById, updateTodoById } from '../repository/Todo.repo'
import { createDoctorInfo, fetchDoctorById, updateDoctorById, deleteDoctorById, listDoctor, paginatedList} from '../controllers/doctorInfo.repo';
import { isAuthenticated } from "../middlewares/isAuthentificated";
import { isAuthorized } from "../middlewares/isAuthorized";
import * as admin from 'firebase-admin';

export const DoctorInfo = Router();


//pagination

DoctorInfo.get('/',  isAuthenticated, isAuthorized({roles: ['admin'], allowSameUser:false}),async (req:Request, res:Response) => {

    let limit = Number(req.query['size'])
    let offset = 0 + Number(req.query['page']) - 1 * limit

    console.log(limit, offset)
    const list = await paginatedList(limit,offset);
 
    res.status(200);
    res.send(list); 
})



DoctorInfo.get('/allDoctors',  isAuthenticated, isAuthorized({roles: ['admin'], allowSameUser:true}), async (req: Request, res: Response) => {


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
    res.status(200);
    res.send(foundDoctor);

})