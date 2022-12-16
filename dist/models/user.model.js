"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initUser = exports.User = void 0;
const sequelize_1 = require("sequelize");
const patientInfo_model_1 = require("./patientInfo.model");
class User extends sequelize_1.Model {
    getId() {
        return this.id;
    }
}
exports.User = User;
const initUser = (sequelize) => {
    User.init({
        id: {
            type: sequelize_1.DataTypes.STRING,
            autoIncrement: false,
            primaryKey: true
        },
        display_name: sequelize_1.DataTypes.STRING,
        email: sequelize_1.DataTypes.STRING,
        password: sequelize_1.DataTypes.STRING,
        role: sequelize_1.DataTypes.STRING,
        status: {
            type: sequelize_1.DataTypes.BOOLEAN,
            defaultValue: true
        }
    }, {
        sequelize // Instance of sequelize that reflects the connection
    });
    User.hasMany(patientInfo_model_1.PatientInfo, {
        foreignKey: 'user_id',
        sourceKey: 'id',
    });
    patientInfo_model_1.PatientInfo.belongsTo(User, {
        foreignKey: 'user_id',
        targetKey: 'id',
    });
};
exports.initUser = initUser;
