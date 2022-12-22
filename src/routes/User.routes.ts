import { Router, Request, Response } from "express";
import { createUser, disableUser, getAllUsers, readUser, updateUser } from "../firebase";
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
    A user can call an endpoint to disable its account (this is a soft-delete operation) is_active = true|false (DONE)
    These requirements can be changed later. 

    ******************************************************************
    ------------------------------------------------------------------
*/

//Allow a patient to sign up to your system by creating an endpoint without needing to authenticate 
UserRouter.post('/newUser/patient',  async (req:Request, res: Response) => {

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

    Create an endpoint where an admin can create a new doctor account (user). (DONE)
    Create an endpoint that can modify the is_active property from the User model back to true. (DONE)

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
