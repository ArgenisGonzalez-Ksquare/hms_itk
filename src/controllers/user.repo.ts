import { InferAttributes } from "sequelize";
import {  User } from "../models/user.model";

// Create operation

export const listPatient =async (status: boolean) => {
    const res = await User.findAll({
        attributes: ['id'], // SELECT id From "Todos" WHERE is_completed = true;
        where: {
            status: true
        }
    })


    return res;
}



export const createPatientInfo = async (display_name:string, email: string, password: string) => {
    try {
        const user = await User.create({
            display_name,
            email,
            password
        })


        return user;
    } catch (error) {
        console.error(error);
        
    }
}
