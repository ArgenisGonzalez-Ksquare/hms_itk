import {Request,Response} from 'express';
import * as admin from 'firebase-admin';


export const isAuthenticated =async (
    req:Request,
    res: Response,
    next:Function
) => {
    //No authorization Header
    const {authorization} = req.headers;

    if(!authorization){
        return res.status(401).send({
            error: 'No Auth'});
    }
    
    //No correct Schema (bearer)

    if(!authorization.startsWith('Bearer')){
        return res.status(401).send({
            error: 'No Auth'
        });
    }

    //Check if the token is valid

    const splittedToken = authorization.split('Bearer');

    if(splittedToken.length !==2){
        return res.status(401).send({
            error: 'No Auth'
        })
    }

    const token = splittedToken[1];

    try {
        const decodedToken: admin.auth.DecodedIdToken = await admin.auth().verifyIdToken(token);
        
        res.locals = {
            ...res.locals,
            email: decodedToken.email,
            uid: decodedToken.uid,
            role:decodedToken.role
        }

        return next(); //si cumple la funcion entonces se ejecuta el next
    } catch (error) {
        console.error(error);
        res.status(401).send({
            error: 'No Auth'
        })
    }
}