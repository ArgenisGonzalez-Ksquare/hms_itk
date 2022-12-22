import { InferAttributes, UUID, where } from "sequelize";
import {  Appointment  } from "../models/appointment.model";
import { DoctorInfo } from "../routes/doctorInfo.routes";

// Appointment MODULE


export const paginatedList = async(uid: string, pLimit:number, pOffset:number) =>{

    try {
        const res = await Appointment.findAll({
            attributes: ['id', 'patientInfo_id', 'doctorInfo_id', 'date'],
            limit: pLimit,
            offset :pOffset,
            where: {
                patientInfo_id: uid,
                is_active: false
                
            }
        })
        return res
    } catch (error) {
        console.error(error)
        return null
    }
    
}

export const paginatedListDoctor = async(uid: string, pLimit:number, pOffset:number) =>{

    try {
        const res = await Appointment.findAll({
            attributes: ['id', 'patientInfo_id', 'doctorInfo_id', 'date'],
            limit: pLimit,
            offset :pOffset,
            where: {
                doctorInfo_id: uid,
                is_active: true
                
            }
        })
        return res
    } catch (error) {
        console.error(error)
        return null
    }
    
}

export const paginatedAllAppointments = async(pLimit:number, pOffset:number, boolean:boolean) =>{

    try {
        const res = await Appointment.findAll({
            attributes: ['id', 'patientInfo_id', 'doctorInfo_id', 'date'],
            limit: pLimit,
            offset :pOffset,
            where: {
                is_active: boolean
                
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
            is_active: is_active
        }
    })
    return res;
}

export const listAppointmentForPatient =async (uid: string) => {
    const res = await Appointment.findAll({
        attributes: ['id', 'patientInfo_id', 'doctorInfo_id','date','is_active'], // SELECT id From "Todos" WHERE is_completed = true;
        where: {
            patientInfo_id: uid,
            is_active: true
        }
    })
    console.log(res)
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


export const fetchAppointmentByPatientId = async (doctorUID:string, patientInfo_id: string) => {
    try {
        const foundAppointment = await Appointment.findAll({
            where: {
                patientInfo_id: patientInfo_id,
                doctorInfo_id: doctorUID
            }
        });

        return foundAppointment;

    } catch (error) {
        console.error(error);

        return null;
    }
}


export const fetchAppointmentByOrder = async (doctorUID:string, Porder:string) => {
    try {
        const foundAppointment = await Appointment.findAll({
            where: {
                doctorInfo_id: doctorUID
            }, order: [['id', `${Porder}`]],
            attributes:['id', 'date', 'patientInfo_id']
        });

        console.log(foundAppointment)
        return foundAppointment;

    } catch (error) {
        console.error(error);

        return null;
    }
}



export const fetchAppointmentByOnlyPatientId = async (patientInfo_id: string) => {
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


export const fetchAppointmentByDate = async (doctorUID:string, nDate: Date) => {
    try {
     
        const foundAppointment = await Appointment.findAll({
            where: {
                doctorInfo_id: doctorUID,
                date: nDate
            }
        });
        
        console.log(foundAppointment);
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




export const updateAppointmentById = async (uid: string, id: number, AppointmentModel: InferAttributes<Appointment>) => {

    try {
        const foo = await Appointment.update({
            date: AppointmentModel.date
        }, {
            where: {
                doctorInfo_id:uid,
                id: id
            }
        })
        
        return foo;
    } catch (error) {
        console.error(error);
        return 'Something went wrong';
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