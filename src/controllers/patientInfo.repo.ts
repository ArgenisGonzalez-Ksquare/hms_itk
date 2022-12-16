import { InferAttributes } from "sequelize";
import {  PatientInfo } from "../models/patientInfo.model";

// Create operation

export const listPatient =async (status: boolean) => {
    const res = await PatientInfo.findAll({
        attributes: ['id'], // SELECT id From "Todos" WHERE is_completed = true;
        where: {
            status: true
        }
    })


    return res;
}



export const createPatientInfo = async (full_name:string, user_id: number, birthdate: Date) => {
    try {
        const patient = await PatientInfo.create({
            full_name,
            user_id,
            birthdate
        })


        return patient;
    } catch (error) {
        console.error(error);
        
    }
}


export const fetchPatientById = async (id: number) => {
    try {
        const foundPatient = await PatientInfo.findByPk(id);

        return foundPatient;

    } catch (error) {
        console.error(error);

        return null;
    }
}


export const updatePatientById = async (id: number, patientModel: InferAttributes<PatientInfo>) => {

    try {
        const foo = await PatientInfo.update({
            full_name: patientModel.full_name,
            birthdate: patientModel.birthdate,
            status: patientModel.status
        }, {
            where: {
                id: id
            }
        })
        
        return foo;
    } catch (error) {
        console.error(error);
        return null;
    }


}

/*
export const deleteTodoById = async (id: number) => {
    try {
        const foo = await Todo.destroy({
            where: {
                id: id
            }
        })
        console.log(foo);
        return foo;
    } catch (error) {
        console.error(error);
        return null;
    }
} */