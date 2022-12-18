import { InferAttributes } from "sequelize";
import {  User } from "../models/user.model";

// Create operatio

export const createUserOnPostgres = async (id:string, displayName:string, email: string, password: string, role : string) => {
    try {
        const user = await User.create({
            id,
            displayName,
            email,
            password,
            role
        })

        return user;
       
    } catch (error) {
        console.error(error);
        return null;
        
    }
}
