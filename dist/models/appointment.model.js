"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initAppointmentInfo = exports.Appointment = void 0;
const sequelize_1 = require("sequelize");
class Appointment extends sequelize_1.Model {
    getId() {
        return this.id;
    }
}
exports.Appointment = Appointment;
const initAppointmentInfo = (sequelize) => {
    Appointment.init({
        id: {
            type: sequelize_1.DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        PatientInfo_id: sequelize_1.DataTypes.INTEGER,
        DoctorInfo_id: sequelize_1.DataTypes.INTEGER,
        Date: sequelize_1.DataTypes.DATE,
        Status: {
            type: sequelize_1.DataTypes.BOOLEAN,
            defaultValue: false
        }
    }, {
        sequelize // Instance of sequelize that reflects the connection
    });
};
exports.initAppointmentInfo = initAppointmentInfo;
