"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initDoctorInfo = exports.doctorInfo = void 0;
const sequelize_1 = require("sequelize");
class doctorInfo extends sequelize_1.Model {
    getId() {
        return this.id;
    }
}
exports.doctorInfo = doctorInfo;
const initDoctorInfo = (sequelize) => {
    doctorInfo.init({
        id: {
            type: sequelize_1.DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        FullName: sequelize_1.DataTypes.STRING,
        UserId: sequelize_1.DataTypes.NUMBER,
        Birthdate: sequelize_1.DataTypes.DATE,
        Status: {
            type: sequelize_1.DataTypes.BOOLEAN,
            defaultValue: true
        }
    }, {
        sequelize // Instance of sequelize that reflects the connection
    });
};
exports.initDoctorInfo = initDoctorInfo;
