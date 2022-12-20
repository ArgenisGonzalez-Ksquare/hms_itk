import { Router, Request, Response } from "express";
import { createUser, disableUser, getAllUsers, readUser, updateUser } from "../firebase";
import { createUserOnPostgres } from '../controllers/user.repo'
import { isAuthenticated } from "../middlewares/isAuthentificated";
import { isAuthorized } from "../middlewares/isAuthorized";
import {Role} from '../firebase/index'
import * as admin from 'firebase-admin';

export const UserRouter = Router();
export const User = Router();


/*
----------------------------------------------------------------------
                Auth Module - Requirements
----------------------------------------------------------------------

    Allow a patient to sign up to your system by creating an endpoint without needing to authenticate (DONE)
    Only allow admin users to be created via your DBMS shell and not expose this role to your server by any means. (DONE)
    Create a login endpoint where you need to compare the password via Hashing (you can skip all of this if you wish by using Firebase) and return a session token using JWT (DONE)
    Create a middleware that will check if a user is authenticated and what role it has (DONE)
    A user can call an endpoint to disable its account (this is a soft-delete operation) is_active = true|false 
    These requirements can be changed later. 

    ******************************************************************
    ------------------------------------------------------------------
*/

//Allow a patient to sign up to your system by creating an endpoint without needing to authenticate 
UserRouter.post('/newUser/patient',  async (req:Request, res: Response) => {

    console.log('se creo un paciente');
    const { uid, displayName, email, password, role}  = req.body

    if (!displayName || !email || !password) {
        return res.status(400).send({error: 'Missing fields'})
    }

    try {
        const userId = await createUser(displayName, email, password, 'patient');
        console.log(userId)
        //const user = await createUserOnPostgres(userId, displayName, email, password, 'patient')


        return res.status(201).send({
            userId
        })
    } catch (error) {
        res.status(500).send({error: 'something went wrong'})
    }

})

UserRouter.get('/:userId', isAuthenticated, isAuthorized({roles: ['patient','admin'], allowSameUser:true}), async  (req:Request, res: Response) => {
     // Dos formas de obtener el userId
     const { userId } = req.params;



     // 2da forma
     const { uid , role} = res.locals;
     
     try {
         const user = await readUser(userId);
         return res.status(200).send(user);
     } catch (error) {
         console.error(error);
         return res.status(500).send({error: 'something went wrong'})
     }
})

/* 
UserRouter.get('/:userId', isAuthenticated, isAuthorized({ roles: ['admin'], allowSameUser: true }), async (req:Request, res: Response) => {
    try {
        const users = await getAllUsers();
        return res.status(200).send(users);
    } catch (error) {
        console.error(error);
        return res.status(500).send({error: 'something went wrong'})
    }
})
 */


/* UserRouter.post('/newUser',  isAuthenticated, isAuthorized({roles: ['admin'], allowSameUser:true}), async (req:Request, res: Response) => {
   

    const { uid, displayName, email, password, role}  = req.body

    if (!displayName || !email || !password || !role) {
        return res.status(400).send({error: 'Missing fields'})
    }

    try {
        const userId = await createUser(displayName, email, password, role);
        console.log(userId)

        return res.status(201).send({
            userId
        })
    } catch (error) {
        res.status(500).send({error: 'something went wrong'})
    }
});
 */

//Disable Account
UserRouter.patch('/disable/:uid', isAuthenticated, isAuthorized({roles: ['doctor','patient'], allowSameUser:true}), async (req: Request, res: Response) => {

    let uid = req.params.uid;

    const gUser = await admin.auth().getUser(uid);
  
    if(gUser.disabled){
        return res.status(200).send({message: 'the account is already disable'});
    }

    try {
        const updatedUser = await disableUser(uid, true);
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




/* ***************************************************
                Admin Module Requirement
   ***************************************************

    Create an endpoint where an admin can create a new doctor account (user).
    Create an endpoint that can modify the is_active property from the User model back to true. 

*/

/* Create an endpoint where an admin can create a new doctor account (user). */
UserRouter.post('/newUser/doctor', isAuthenticated, isAuthorized({roles: ['admin'], allowSameUser:false}), async (req:Request, res: Response) => {

    const { uid, displayName, email, password, role}  = req.body

    if (!displayName || !email || !password) {
        return res.status(400).send({error: 'Missing fields'})
    }

    try {
        const userId = await createUser(displayName, email, password, 'doctor');
        console.log(userId)


        return res.status(201).send({
            userId
        })
    } catch (error) {
        res.status(500).send({error: 'something went wrong'})
    }

})

/* Create an endpoint that can modify the is_active property from the User model back to true. */
UserRouter.patch('/enable/:uid', isAuthenticated, isAuthorized({roles: ['admin'], allowSameUser:false}),async (req: Request, res: Response) => {
    let uid = req.params.uid;

    const gUser = await admin.auth().getUser(uid);

    if(!gUser.disabled){
        return res.status(200).send({message: 'the account is already enable'});
    }

    try {
        const user:any = await disableUser(uid, false);
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

/*
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