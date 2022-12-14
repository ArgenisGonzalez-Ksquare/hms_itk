import {Request,Response} from 'express';
import * as admin from 'firebase-admin';
import {Role} from '../firebase/index'


export const isAuthorized = (options: {roles: Role[]; allowSameUser: boolean}) => {
    return(req:Request, res:Response, next:Function) => {
        const {uid, email, role} = res.locals;
        const {userId} = req.params;

        if(email === 'SUPER USER'){
            next();
        }

        //COM
        if(options.allowSameUser && userId && userId === uid){
            next();
        }

        if(!role){
            return res.status(403).send();
        }

        if(options.roles.includes(role)){
            return next();
        }

        return res.status(403).send();

    }
}