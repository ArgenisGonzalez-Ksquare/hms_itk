import { Router, Request, Response } from "express";
import { createUser, disableUser, getAllUsers, readUser, updateUser } from "../firebase";
import { isAuthenticated } from "../middlewares/isAuthentificated";
import { isAuthorized } from "../middlewares/isAuthorized";
import {Role} from '../firebase/index'

export const UserRouter = Router();

UserRouter.post('/newUser',async (req:Request, res: Response) => {
    // Info desde el body
    // Checar si falta info
    // Checar que el rol sea adecuado

    const { displayName, email, password }  = req.body

    if (!displayName || !email || !password) {
        return res.status(400).send({error: 'Missing fields'})
    }


    try {
        const userId = await createUser(displayName, email, password, 'patient');
        res.status(201).send({
            userId
        })
    } catch (error) {
        res.status(500).send({error: 'something went wrong'})
    }

})



UserRouter.get('/:userId', isAuthenticated, isAuthorized({roles: ['admin'], allowSameUser:true}), async  (req:Request, res: Response) => {
     // Dos formas de obtener el userId
     const { userId } = req.params;

     // 2da forma
     const { uid } = res.locals;
 
     try {
         const user = await readUser(userId);
         return res.status(200).send(user);
     } catch (error) {
         console.error(error);
         return res.status(500).send({error: 'something went wrong'})
     }
})


/* UserRouter.put('/disable/:uid', async (req: Request, res: Response) => {
    let uid = req.params.uid;
    const { disabled } = req.body;

    if (disabled === undefined || typeof disabled !== 'boolean') {
        return res.status(400).send({
            error: 'invalid data'
        })
    }

    try {
        const user:any = await disableUser(uid, disabled);
        if (!user) {
            return res.status(400).send({
                error: "invalid id"
            })
        }
        res.status(200).send(user)

    } catch (error) {
        res.status(500).send({ error: 'something went wrong' });

    }

})

UserRouter.put('/update/:uid', async (req: Request, res: Response) => {

    let uid = req.params.uid;
    const { displayName, email, password } = req.body;

    try {
        const updatedUser = await updateUser(uid, displayName, email, password);
        if (!updatedUser) {
            return res.status(400).send({
                error: "invalid id"
            })
        }
        res.status(201).send({
            updatedUser
        })

    } catch (error) {
        res.status(500).send({ error: 'something went wrong' });
    }
})

UserRouter.get('/', async (_req: Request, res: Response) => {

    try {
        const users = await getAllUsers();
        res.status(202).send({
            users
        })

    }
    catch (error) {
        res.status(500).send({ error: 'something went wrong' });
    }
})



UserRouter.get('/:uid', async (req: Request, res: Response) => {

    let uid = req.params.uid;

    try {
        const user = await readUser(uid);
        if (!user) {
            return res.status(400).send({
                error: "invalid id"
            })
        }
        res.status(202).send({
            user
        })

    }
    catch (error) {
        res.status(500).send({ error: 'something went wrong' });
    }
}) */