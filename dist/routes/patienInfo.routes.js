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
exports.PatientInfo = void 0;
const express_1 = require("express");
//import { createTodo, deleteTodoById, fetchTodoById, updateTodoById } from '../repository/Todo.repo'
const patientInfo_repo_1 = require("../controllers/patientInfo.repo");
exports.PatientInfo = (0, express_1.Router)();
exports.PatientInfo.post('/newPatient', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const FullName = req.body.FullName;
    const UserId = req.body.UserId;
    const Birthdate = req.body.Birthdate;
    if (!FullName || !UserId || !Birthdate) {
        res.status(400);
        return res.send({
            message: 'Some information is missing'
        });
    }
    // Si tengo mi description
    // Debo crear un nuevo TODO y guardarlo a la DB
    const newPatientId = yield (0, patientInfo_repo_1.createPatientInfo)(FullName, UserId, Birthdate);
    res.status(201);
    res.send({
        newPatientId
    });
}));
exports.PatientInfo.get('/:patienInfoId', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const PatientId = Number(req.params['patienInfoId']);
    if (PatientId <= 0) {
        res.status(400);
        return res.send({
            error: 'Invalid id'
        });
    }
    const foundPatient = yield (0, patientInfo_repo_1.fetchPatientById)(PatientId);
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
exports.PatientInfo.put('/:patientId', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const patientId = Number(req.params['patientId']);
    const body = req.body;
    if (patientId <= 0) {
        res.status(400);
        return res.send({
            error: 'Invalid id'
        });
    }
    const affectedRows = yield (0, patientInfo_repo_1.updatePatientById)(patientId, body);
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
    const foundPatient = yield (0, patientInfo_repo_1.fetchPatientById)(patientId);
    res.status(200);
    return res.send(foundPatient);
}));
/*

TodoRouter.delete('/:todoId', async (req: Request, res: Response) => {
    const todoId = Number(req.params['todoId']);
    if (todoId <= 0) {
        res.status(400);
        return res.send({
            error: 'Invalid id'
        })
    }

    const ar = await deleteTodoById(todoId);

    if (!ar)  {
        return res.status(400).send({
            error: 'Cannot delete'
        })
    }

    return res.sendStatus(200);
}) */ 
