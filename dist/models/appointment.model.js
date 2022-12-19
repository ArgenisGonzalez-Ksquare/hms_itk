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
        patientInfo_id: sequelize_1.DataTypes.STRING,
        doctorInfo_id: sequelize_1.DataTypes.STRING,
        date: sequelize_1.DataTypes.DATE,
        is_active: {
            type: sequelize_1.DataTypes.BOOLEAN,
            defaultValue: false
        }
    }, {
        sequelize // Instance of sequelize that reflects the connection
    });
};
exports.initAppointmentInfo = initAppointmentInfo;
