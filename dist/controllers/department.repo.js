"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteDepartmentById = exports.updateDepartmentById = exports.fetchDepartmentById = exports.createDepartment = exports.listDepartments = exports.paginatedList = void 0;
const department_model_1 = require("../models/department.model");
// Create operation
const paginatedList = (pLimit, pOffset) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const res = yield department_model_1.Department.findAll({
            attributes: ['id', 'department'],
            limit: pLimit,
            offset: pOffset,
            where: {
                is_active: true
            }
        });
        return res;
    }
    catch (error) {
        console.error(error);
        return null;
    }
});
exports.paginatedList = paginatedList;
const listDepartments = (is_active) => __awaiter(void 0, void 0, void 0, function* () {
    const res = yield department_model_1.Department.findAll({
        attributes: ['id', 'department'],
        where: {
            is_active: true
        }
    });
    return res;
});
exports.listDepartments = listDepartments;
const createDepartment = (department) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const departmentResult = yield department_model_1.Department.create({
            department
        });
        return departmentResult;
    }
    catch (error) {
        console.error(error);
        return null;
    }
});
exports.createDepartment = createDepartment;
const fetchDepartmentById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const foundDepartment = yield department_model_1.Department.findByPk(id);
        return foundDepartment;
    }
    catch (error) {
        console.error(error);
        return null;
    }
});
exports.fetchDepartmentById = fetchDepartmentById;
const updateDepartmentById = (id, departmentModel) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const foo = yield department_model_1.Department.update({
            department: departmentModel.department,
            is_active: departmentModel.is_active
        }, {
            where: {
                id: id
            }
        });
        return foo;
    }
    catch (error) {
        console.error(error);
        return null;
    }
});
exports.updateDepartmentById = updateDepartmentById;
const deleteDepartmentById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const foo = yield department_model_1.Department.update({
            is_active: false
        }, {
            where: {
                id: id
            }
        });
        return foo;
    }
    catch (error) {
        console.error(error);
        return null;
    }
});
exports.deleteDepartmentById = deleteDepartmentById;
