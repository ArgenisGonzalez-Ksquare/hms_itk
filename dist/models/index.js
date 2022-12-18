"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.startSequelize = exports.sequelize = void 0;
const sequelize_1 = require("sequelize");
const patientInfo_model_1 = require("./patientInfo.model"); // Modelos
const user_model_1 = require("./user.model");
const appointment_model_1 = require("./appointment.model");
const doctorInfo_model_1 = require("./doctorInfo.model");
const department_model_1 = require("./department.model");
const models = [department_model_1.initDepartment, patientInfo_model_1.initPatienInfo, user_model_1.initUser, doctorInfo_model_1.initDoctorInfo, appointment_model_1.initAppointmentInfo];
const startSequelize = (db_name, db_password, db_hostname, db_username) => {
    exports.sequelize = new sequelize_1.Sequelize(db_name, db_username, db_password, {
        dialect: 'postgres',
        host: db_hostname,
    });
    for (const initModel of models) {
        initModel(exports.sequelize);
    }
    return exports.sequelize;
};
exports.startSequelize = startSequelize;
