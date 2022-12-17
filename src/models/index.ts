import { Sequelize } from "sequelize";
import { initPatienInfo } from './patientInfo.model' // Modelos
import { initUser } from "./user.model";
import { initAppointmentInfo } from "./appointment.model";
import { initDoctorInfo } from "./doctorInfo.model";
export let sequelize: Sequelize;

const models = [initPatienInfo, initUser, initDoctorInfo, initAppointmentInfo];

export const startSequelize = (db_name: string, db_password: string, db_hostname: string, db_username: string) => {
    sequelize = new Sequelize(db_name, db_username, db_password, {

        dialect: 'postgres',
        host: db_hostname,
    })


    for(const initModel of models) {
        initModel(sequelize);
    }


    return sequelize;
}

