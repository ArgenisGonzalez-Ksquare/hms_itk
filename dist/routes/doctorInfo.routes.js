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
exports.DoctorInfo = void 0;
const express_1 = require("express");
//import { createTodo, deleteTodoById, fetchTodoById, updateTodoById } from '../repository/Todo.repo'
const doctorInfo_repo_1 = require("../controllers/doctorInfo.repo");
exports.DoctorInfo = (0, express_1.Router)();
//pagination
exports.DoctorInfo.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //SI NO ES Doctor NO PUEDE VER
    if (req.headers['role'] !== 'admin') {
        return res.status(402).send({
            error: "Not Authorized"
        });
    }
    let limit = Number(req.query['size']);
    let offset = 0 + Number(req.query['page']) - 1 * limit;
    console.log(limit, offset);
    const list = yield (0, doctorInfo_repo_1.paginatedList)(limit, offset);
    res.status(200);
    res.send(list);
}));
exports.DoctorInfo.get('/allDoctors', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //SI NO ES Doctor NO PUEDE VER
    if (req.headers['role'] !== 'admin') {
        return res.status(402).send({
            error: "Not Authorized"
        });
    }
    let list = yield (0, doctorInfo_repo_1.listDoctor)(false);
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
exports.DoctorInfo.post('/newDoctor', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const FullName = req.body.full_name;
    const UserId = req.body.user_id;
    const Birthdate = req.body.birthdate;
    //SI NO ES Doctor NO PUEDE VER
    if (req.headers['role'] !== 'admin') {
        return res.status(402).send({
            error: "Not Authorized"
        });
    }
    if (!FullName || !Birthdate || !UserId) {
        res.status(400);
        return res.send({
            message: 'Some information is missing'
        });
    }
    // Si tengo mi description
    // Debo crear un nuevo TODO y guardarlo a la DB
    const newDoctorId = yield (0, doctorInfo_repo_1.createDoctorInfo)(FullName, UserId, Birthdate);
    res.status(201);
    res.send({
        newDoctorId
    });
}));
exports.DoctorInfo.get('/:doctorInfoId', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const DoctorId = Number(req.params['doctorInfoId']);
    //SI NO ES Doctor NO PUEDE VER
    if (req.headers['role'] !== 'admin') {
        return res.status(402).send({
            error: "Not Authorized"
        });
    }
    if (DoctorId <= 0) {
        res.status(400);
        return res.send({
            error: 'Invalid id'
        });
    }
    const foundDoctor = yield (0, doctorInfo_repo_1.fetchDoctorById)(DoctorId);
    if (!foundDoctor) {
        res.status(400);
        return res.send({
            error: 'Todo not found.'
        });
    }
    // TodoId es mayor a 0 y Todo con el TodoId existe en la DB
    res.status(200);
    res.send(foundDoctor);
}));
exports.DoctorInfo.put('/:DoctorId', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const DoctorId = Number(req.params['DoctorId']);
    const body = req.body;
    //SI NO ES Doctor NO PUEDE VER
    if (req.headers['role'] !== 'admin') {
        return res.status(402).send({
            error: "Not Authorized"
        });
    }
    if (DoctorId <= 0) {
        res.status(400);
        return res.send({
            error: 'Invalid id'
        });
    }
    const affectedRows = yield (0, doctorInfo_repo_1.updateDoctorById)(DoctorId, body);
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
    const foundDoctor = yield (0, doctorInfo_repo_1.fetchDoctorById)(DoctorId);
    res.status(200);
    return res.send(foundDoctor);
}));
exports.DoctorInfo.delete('/:DoctorId', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const DoctorId = Number(req.params['DoctorId']);
    //SI NO ES Doctor NO PUEDE VER
    if (req.headers['role'] !== 'admin') {
        return res.status(402).send({
            error: "Not Authorized"
        });
    }
    if (DoctorId <= 0) {
        res.status(400);
        return res.send({
            error: 'Invalid id'
        });
    }
    const ar = yield (0, doctorInfo_repo_1.deleteDoctorById)(DoctorId);
    if (!ar) {
        return res.status(400).send({
            error: 'Cannot delete'
        });
    }
    return res.sendStatus(200);
}));
