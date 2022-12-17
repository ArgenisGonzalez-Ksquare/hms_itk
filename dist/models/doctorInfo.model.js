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
        FullName: sequelize_1.DataTypes.STRING,
        UserId: sequelize_1.DataTypes.INTEGER,
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
