"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initPatienInfo = exports.PatientInfo = void 0;
const sequelize_1 = require("sequelize");
class PatientInfo extends sequelize_1.Model {
}
exports.PatientInfo = PatientInfo;
const initPatienInfo = (sequelize) => {
    PatientInfo.init({
        id: {
            type: sequelize_1.DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        full_name: sequelize_1.DataTypes.STRING,
        user_id: sequelize_1.DataTypes.STRING,
        birthdate: sequelize_1.DataTypes.DATEONLY,
        is_active: {
            type: sequelize_1.DataTypes.BOOLEAN,
            defaultValue: true
        }
    }, {
        tableName: "patientInfo",
        sequelize // Instance of sequelize that reflects the connection
    });
    /*     PatientInfo.hasMany(Appointment);
        Appointment.belongsTo(PatientInfo); */
};
exports.initPatienInfo = initPatienInfo;
