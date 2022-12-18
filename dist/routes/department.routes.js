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
exports.Department = void 0;
const express_1 = require("express");
//import { createTodo, deleteTodoById, fetchTodoById, updateTodoById } from '../repository/Todo.repo'
const department_repo_1 = require("../controllers/department.repo");
exports.Department = (0, express_1.Router)();
//pagination
exports.Department.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //SI NO ES PATIENT NO PUEDE VER
    if ((req.headers['role'] !== 'admin')) {
        return res.status(402).send({
            error: "Not Authorized"
        });
    }
    let limit = Number(req.query['size']);
    let offset = 0 + Number(req.query['page']) - 1 * limit;
    console.log(limit, offset);
    const list = yield (0, department_repo_1.paginatedList)(limit, offset);
    res.status(200);
    res.send(list);
}));
exports.Department.get('/alldepartments', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //SI NO ES PATIENT NO PUEDE VER
    if (req.headers['role'] !== 'admin') {
        return res.status(402).send({
            error: "Not Authorized"
        });
    }
    let list = yield (0, department_repo_1.listDepartments)(false);
    if (!list) {
        res.status(400);
        return res.send({
            error: 'Empty List'
        });
    }
    res.status(200);
    res.send({
        list
    });
}));
exports.Department.post('/newDepartment', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const Department = req.body.department;
    //SI NO ES admin NO PUEDE VER
    if (req.headers['role'] !== 'admin') {
        return res.status(400).send({
            error: "Not Authorized"
        });
    }
    if (!Department) {
        res.status(400);
        return res.send({
            message: 'Some information is missing'
        });
    }
    // Si tengo mi description
    // Debo crear un nuevo TODO y guardarlo a la DB
    const newDepartmentId = yield (0, department_repo_1.createDepartment)(Department);
    res.status(201);
    res.send({
        newDepartmentId
    });
}));
exports.Department.get('/:departmentId', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const departmentId = Number(req.params['departmentId']);
    //SI NO ES PATIENT NO PUEDE VER
    if (req.headers['role'] !== 'admin') {
        return res.status(402).send({
            error: "Not Authorized"
        });
    }
    if (departmentId <= 0) {
        res.status(400);
        return res.send({
            error: 'Invalid id'
        });
    }
    const foundPatient = yield (0, department_repo_1.fetchDepartmentById)(departmentId);
    if (!foundPatient) {
        res.status(400);
        return res.send({
            error: 'Todo not found.'
        });
    }
    // TodoId es mayor a 0 y Todo con el TodoId existe en la DB
    res.status(200);
    res.send(foundPatient);
}));
exports.Department.put('/:departmentId', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const departmentId = Number(req.params['departmentId']);
    const body = req.body;
    //SI NO ES PATIENT NO PUEDE VER
    if (req.headers['role'] !== 'admin') {
        return res.status(402).send({
            error: "Not Authorized"
        });
    }
    if (departmentId <= 0) {
        res.status(400);
        return res.send({
            error: 'Invalid id'
        });
    }
    const affectedRows = yield (0, department_repo_1.updateDepartmentById)(departmentId, body);
    console.log("----------------");
    console.log(affectedRows);
    if (!affectedRows) {
        res.status(500);
        return res.send({
            error: 'Something went wrong! :)'
        });
    }
    if (affectedRows[0] === 0) {
        res.status(400);
        return res.send({
            error: 'Update failed'
        });
    }
    const foundDepartment = yield (0, department_repo_1.fetchDepartmentById)(departmentId);
    res.status(200);
    return res.send(foundDepartment);
}));
exports.Department.delete('/:departmentId', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const departmentId = Number(req.params['departmentId']);
    //SI NO ES PATIENT NO PUEDE VER
    if (req.headers['role'] !== 'admin') {
        return res.status(402).send({
            error: "Not Authorized"
        });
    }
    if (departmentId <= 0) {
        res.status(400);
        return res.send({
            error: 'Invalid id'
        });
    }
    const ar = yield (0, department_repo_1.deleteDepartmentById)(departmentId);
    if (!ar) {
        return res.status(400).send({
            error: 'Cannot delete'
        });
    }
    return res.sendStatus(200);
}));
