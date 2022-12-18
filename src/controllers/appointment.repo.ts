import { InferAttributes, where } from "sequelize";
import {  Appointment  } from "../models/appointment.model";

// Appointment MODULE


export const paginatedList = async(pLimit:number, pOffset:number) =>{

    try {
        const res = await Appointment.findAll({
            attributes: ['id', 'patientInfo_id', 'doctorInfo_id', 'date'],
            limit: pLimit,
            offset :pOffset,
            where: {
                is_active: false
            }
        })
        return res
    } catch (error) {
        console.error(error)
        return null
    }

    
}

//Create a series of endpoints that need to LIST, Read, Create and Delete appointments 

export const listAppointment =async (is_active: boolean) => {
    const res = await Appointment.findAll({
        attributes: ['id', 'patientInfo_id', 'doctorInfo_id','date'], // SELECT id From "Todos" WHERE is_completed = true;
        where: {
            is_active: true
        }
    })
    return res;
}

export const createAppointment = async (patientInfo_id:string, doctorInfo_id: string, date: Date) => {
    try {
        const AppointmentResult = await Appointment.create({
            patientInfo_id,
            doctorInfo_id,
            date
        })


        return AppointmentResult;
    } catch (error) {
        console.error(error);
        return null
        
    }
}


export const fetchAppointmentById = async (id: number) => {
    try {
        const foundAppointment = await Appointment.findByPk(id);

        return foundAppointment;

    } catch (error) {
        console.error(error);

        return null;
    }
}

export const fetchAppointmentByDoctorId = async (doctor_id: string) => {
    try {
        const foundAppointment = await Appointment.findAll({
            where: {
                doctorInfo_id: doctor_id
            }
        });

        return foundAppointment;

    } catch (error) {
        console.error(error);

        return null;
    }
}


export const fetchAppointmentByPatientId = async (patientInfo_id: string) => {
    try {
        const foundAppointment = await Appointment.findAll({
            where: {
                patientInfo_id: patientInfo_id
            }
        });

        return foundAppointment;

    } catch (error) {
        console.error(error);

        return null;
    }
}


export const fetchAppointmentByDate = async (nDate: Date) => {
    try {
        const foundAppointment = await Appointment.findAll({
            where: {
                date: nDate
            }
        });

        return foundAppointment;

    } catch (error) {
        console.error(error);

        return null;
    }
}

export const fetchAppointmentByIsDelete = async(is_active:boolean) => {
    try {
        const foundAppointment = await Appointment.findAll({
            where: {
                is_active: is_active
            }
        });

        return foundAppointment;

    } catch (error) {
        console.error(error);

        return null;
    }
}




export const updateAppointmentById = async (id: number, AppointmentModel: InferAttributes<Appointment>) => {

    try {
        const foo = await Appointment.update({
            date: AppointmentModel.date
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


export const deleteAppointmentById = async (id: number) => {
    try {
        const foo = await Appointment.update({
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