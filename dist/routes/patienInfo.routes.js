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
const patientInfo_repo_1 = require("../controllers/patientInfo.repo");
const isAuthentificated_1 = require("../middlewares/isAuthentificated");
const isAuthorized_1 = require("../middlewares/isAuthorized");
exports.PatientInfo = (0, express_1.Router)();
//pagination
exports.PatientInfo.get('/', isAuthentificated_1.isAuthenticated, (0, isAuthorized_1.isAuthorized)({ roles: ['admin'], allowSameUser: false }), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let limit = Number(req.query['size']);
    let offset = 0 + Number(req.query['page']) - 1 * limit;
    console.log(limit, offset);
    const list = yield (0, patientInfo_repo_1.paginatedList)(limit, offset);
    res.status(200);
    res.send(list);
}));
exports.PatientInfo.get('/allpatients', isAuthentificated_1.isAuthenticated, (0, isAuthorized_1.isAuthorized)({ roles: ['admin'], allowSameUser: false }), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let list = yield (0, patientInfo_repo_1.listPatient)(false);
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
exports.PatientInfo.post('/newPatient', isAuthentificated_1.isAuthenticated, (0, isAuthorized_1.isAuthorized)({ roles: ['patient'], allowSameUser: true }), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const FullName = req.body.full_name;
    const UserId = res.locals.uid;
    const Birthdate = req.body.birthdate;
    console.log(UserId);
    if (!FullName || !Birthdate || !UserId) {
        res.status(400);
        return res.send({
            message: 'Some information is missing'
        });
    }
    const newPatientId = yield (0, patientInfo_repo_1.createPatientInfo)(FullName, UserId, Birthdate);
    res.status(201);
    res.send({
        newPatientId
    });
}));
exports.PatientInfo.get('/:patienInfoId', isAuthentificated_1.isAuthenticated, (0, isAuthorized_1.isAuthorized)({ roles: ['admin', 'patient'], allowSameUser: true }), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const PatientId = Number(req.params['patienInfoId']);
    const foundPatient = yield (0, patientInfo_repo_1.fetchPatientById)(PatientId);
    if (!foundPatient) {
        res.status(400);
        return res.send({
            error: 'Patient not found.'
        });
    }
    res.status(200);
    res.send(foundPatient);
}));
exports.PatientInfo.put('/:patientId', isAuthentificated_1.isAuthenticated, (0, isAuthorized_1.isAuthorized)({ roles: ['admin', 'patient'], allowSameUser: true }), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const patientId = Number(req.params['patientId']);
    const body = req.body;
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
exports.PatientInfo.delete('/:patientId', isAuthentificated_1.isAuthenticated, (0, isAuthorized_1.isAuthorized)({ roles: ['admin', 'patient'], allowSameUser: true }), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const patientId = Number(req.params['patientId']);
    const ar = yield (0, patientInfo_repo_1.deletePatientById)(patientId);
    if (!ar) {
        return res.status(400).send({
            error: 'Cannot delete'
        });
    }
    return res.sendStatus(200);
}));
