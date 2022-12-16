"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initAppointmentInfo = exports.appointment = void 0;
const sequelize_1 = require("sequelize");
class appointment extends sequelize_1.Model {
    getId() {
        return this.id;
    }
}
exports.appointment = appointment;
const initAppointmentInfo = (sequelize) => {
    appointment.init({
        id: {
            type: sequelize_1.DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        PatientInfo_id: sequelize_1.DataTypes.NUMBER,
        DoctorInfo_id: sequelize_1.DataTypes.NUMBER,
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
