"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initDoctorInfo = exports.DoctorInfo = void 0;
const sequelize_1 = require("sequelize");
class DoctorInfo extends sequelize_1.Model {
    getId() {
        return this.id;
    }
}
exports.DoctorInfo = DoctorInfo;
const initDoctorInfo = (sequelize) => {
    DoctorInfo.init({
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
        tableName: "doctorInfo",
        sequelize // Instance of sequelize that reflects the connection
    });
    /*     DoctorInfo.hasMany(Appointment);
        Appointment.belongsTo(DoctorInfo); */
};
exports.initDoctorInfo = initDoctorInfo;
