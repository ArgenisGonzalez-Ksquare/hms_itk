import { InferAttributes, where } from "sequelize";
import {  PatientInfo } from "../models/patientInfo.model";

// Create operation


export const paginatedList = async(pLimit:number, pOffset:number) =>{

    try {
        const res = await PatientInfo.findAll({
            attributes: ['id', 'full_name', 'birthdate'],
            limit: pLimit,
            offset :pOffset,
            where: {
                is_active: true
            }
        })
        return res
    } catch (error) {
        console.error(error)
        return null
    }

    
}


export const listPatient =async (is_active: boolean) => {
    const res = await PatientInfo.findAll({
        attributes: ['id', 'full_name', 'birthdate'], // SELECT id From "Todos" WHERE is_completed = true;
        where: {
            is_active: true
        }
    })
    return res;
}

export const createPatientInfo = async (full_name:string, user_id: string, birthdate: Date) => {
    try {
        const patient = await PatientInfo.create({
            full_name,
            user_id,
            birthdate,
        })


        return patient;
    } catch (error) {
        console.error(error);
        return null
        
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
            is_active: patientModel.is_active
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


export const deletePatientById = async (id: number) => {
    try {
        const foo = await PatientInfo.update({
            is_active: false
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