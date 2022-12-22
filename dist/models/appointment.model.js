"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initAppointmentInfo = exports.Appointment = void 0;
const sequelize_1 = require("sequelize");
class Appointment extends sequelize_1.Model {
}
exports.Appointment = Appointment;
const initAppointmentInfo = (sequelize) => {
    Appointment.init({
        id: {
            type: sequelize_1.DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        patientInfo_id: {
            type: sequelize_1.DataTypes.STRING,
            /*             references: {
                            model: 'patientInfo', // 'fathers' refers to table name
                            key: 'id', // 'id' refers to column name in fathers table
                        } */
        },
        doctorInfo_id: {
            type: sequelize_1.DataTypes.STRING,
            /*             references: {
                            model: 'doctorInfo', // 'fathers' refers to table name
                            key: 'id', // 'id' refers to column name in fathers table
                        } */
        },
        date: sequelize_1.DataTypes.DATE,
        is_active: {
            type: sequelize_1.DataTypes.BOOLEAN,
            defaultValue: true
        }
    }, {
        tableName: "appointments",
        sequelize // Instance of sequelize that reflects the connection
    });
    /* PatientInfo.hasMany(Appointment, { foreignKey: 'patienInfo_id', foreignKeyConstraint: true });
    DoctorInfo.hasMany(Appointment, { foreignKey: 'doctorInfo_id', foreignKeyConstraint: true }); */
};
exports.initAppointmentInfo = initAppointmentInfo;
