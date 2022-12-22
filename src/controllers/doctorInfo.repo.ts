import { InferAttributes, where } from "sequelize";
import {  DoctorInfo } from "../models/doctorInfo.model";

// Create operation


export const paginatedList = async(pLimit:number, pOffset:number) =>{

    try {
        const res = await DoctorInfo.findAll({
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


export const listDoctor =async (is_active: boolean) => {
    const res = await DoctorInfo.findAll({
        attributes: ['id', 'full_name', 'birthdate'], // SELECT id From "Todos" WHERE is_completed = true;
        where: {
            is_active: true
        }
    })
    return res;
}

export const createDoctorInfo = async (full_name:string, user_id: string, birthdate: Date) => {
    try {
        const Doctor = await DoctorInfo.create({
            full_name,
            user_id,
            birthdate
        })


        return Doctor;
    } catch (error) {
        console.error(error);
        return null
        
    }
}


export const fetchDoctorById = async (id: number) => {
    try {
        const foundDoctor = await DoctorInfo.findByPk(id);

        return foundDoctor;

    } catch (error) {
        console.error(error);

        return null;
    }
}

export const fetchDoctorByUID = async (uid: string) => {
    try {
        const foundDoctor = await DoctorInfo.findAll({
            attributes:['user_id'],
            where:{
                user_id:uid
            }
        });

        return foundDoctor;

    } catch (error) {
        console.error(error);

        return null;
    }
}


export const updateDoctorById = async (id: number, DoctorModel: InferAttributes<DoctorInfo>) => {

    try {
        const foo = await DoctorInfo.update({
            full_name: DoctorModel.full_name,
            birthdate: DoctorModel.birthdate,
            is_active: DoctorModel.is_active
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


export const deleteDoctorById = async (id: number) => {
    try {
        const foo = await DoctorInfo.update({
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