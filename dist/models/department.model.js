"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initDepartment = exports.department = void 0;
const sequelize_1 = require("sequelize");
class department extends sequelize_1.Model {
    getId() {
        return this.id;
    }
}
exports.department = department;
const initDepartment = (sequelize) => {
    department.init({
        id: {
            type: sequelize_1.DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        Department: sequelize_1.DataTypes.STRING,
        Status: {
            type: sequelize_1.DataTypes.BOOLEAN,
            defaultValue: true
        }
    }, {
        sequelize // Instance of sequelize that reflects the connection
    });
};
exports.initDepartment = initDepartment;
