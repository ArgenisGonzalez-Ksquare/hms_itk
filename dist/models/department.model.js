"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initDepartment = exports.Department = void 0;
const sequelize_1 = require("sequelize");
class Department extends sequelize_1.Model {
    getId() {
        return this.id;
    }
}
exports.Department = Department;
const initDepartment = (sequelize) => {
    Department.init({
        id: {
            type: sequelize_1.DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        department: sequelize_1.DataTypes.STRING,
        is_active: {
            type: sequelize_1.DataTypes.BOOLEAN,
            defaultValue: true
        }
    }, {
        tableName: "deparment",
        sequelize // Instance of sequelize that reflects the connection
    });
};
exports.initDepartment = initDepartment;
