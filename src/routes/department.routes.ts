import { Router, Request, Response } from 'express';
import { userInfo } from 'os';
//import { createTodo, deleteTodoById, fetchTodoById, updateTodoById } from '../repository/Todo.repo'
import { paginatedList, listDepartments, createDepartment, fetchDepartmentById, updateDepartmentById, deleteDepartmentById}  from '../controllers/department.repo'

export const Department = Router();


//pagination

Department.get('/', async (req:Request, res:Response) => {


    //SI NO ES PATIENT NO PUEDE VER
    if((req.headers['role'] !== 'admin')){
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



Department.get('/alldepartments', async (req: Request, res: Response) => {

    
    //SI NO ES PATIENT NO PUEDE VER
    if(req.headers['role'] !== 'admin'){
        return res.status(402).send({
            error: "Not Authorized"
        })
    }


    let list = await listDepartments(false);
    

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


Department.post('/newDepartment', async (req: Request, res: Response) => {
    const Department: string = req.body.department as string;

    //SI NO ES admin NO PUEDE VER
    if(req.headers['role'] !== 'admin'){
        return res.status(400).send({
            error: "Not Authorized"
        })
    }


    if (!Department) {
        res.status(400)
        return res.send({
            message: 'Some information is missing'
        })
    }

    // Si tengo mi description
    // Debo crear un nuevo TODO y guardarlo a la DB
    const newDepartmentId = await createDepartment(Department);

    res.status(201);
    res.send({
        newDepartmentId
    })
})


Department.get('/:departmentId', async (req: Request, res: Response) => {

    const departmentId = Number(req.params['departmentId']);

    
    //SI NO ES PATIENT NO PUEDE VER
    if(req.headers['role'] !== 'admin'){
        return res.status(402).send({
            error: "Not Authorized"
        })
    }


    if (departmentId <= 0) {
        res.status(400);
        return res.send({
            error: 'Invalid id'
        })
    }

    const foundPatient = await fetchDepartmentById(departmentId);

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

Department.put('/:departmentId', async (req: Request, res: Response) => {
    const departmentId = Number(req.params['departmentId']);
    const body = req.body;

    
    //SI NO ES PATIENT NO PUEDE VER
    if(req.headers['role'] !== 'admin'){
        return res.status(402).send({
            error: "Not Authorized"
        })
    }


    if (departmentId <= 0) {
        res.status(400);
        return res.send({
            error: 'Invalid id'
        })
    }

    const affectedRows = await updateDepartmentById(departmentId, body);
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

    const foundDepartment = await fetchDepartmentById(departmentId);

    res.status(200)
    return res.send(foundDepartment);
})



Department.delete('/:departmentId', async (req: Request, res: Response) => {
    const departmentId = Number(req.params['departmentId']);

    
    //SI NO ES PATIENT NO PUEDE VER
    if(req.headers['role'] !== 'admin'){
        return res.status(402).send({
            error: "Not Authorized"
        })
    }

    
    if (departmentId <= 0) {
        res.status(400);
        return res.send({
            error: 'Invalid id'
        })
    }

    const ar = await deleteDepartmentById(departmentId);

    if (!ar)  {
        return res.status(400).send({
            error: 'Cannot delete'
        })
    }

    return res.sendStatus(200);
})