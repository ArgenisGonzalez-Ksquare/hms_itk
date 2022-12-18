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
exports.Appointment = void 0;
const express_1 = require("express");
//import { createTodo, deleteTodoById, fetchTodoById, updateTodoById } from '../repository/Todo.repo'
const appointment_repo_1 = require("../controllers/appointment.repo");
exports.Appointment = (0, express_1.Router)();
//Create pagination for this resource
//[Appointments] Create pagination filters for the previous endpoint 
exports.Appointment.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //SI NO ES ApplistAppointment NO PUEDE VER
    if (req.headers['role'] !== 'patient') {
        return res.status(402).send({
            error: "Not Authorized"
        });
    }
    let limit = Number(req.query['size']);
    let offset = 0 + Number(req.query['page']) - 1 * limit;
    console.log(limit, offset);
    const list = yield (0, appointment_repo_1.paginatedList)(limit, offset);
    res.status(200);
    res.send(list);
}));
//Create a series of endpoints that need to LIST, Read, Create and Delete appointments 
//Create an endpoint that would LIST all the appointments in the table 
exports.Appointment.get('/allAppointment', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //SI NO ES ApplistAppointment NO PUEDE VER
    if (req.headers['role'] !== 'admin') {
        return res.status(402).send({
            error: "Not Authorized"
        });
    }
    let list = yield (0, appointment_repo_1.listAppointment)(false);
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
exports.Appointment.post('/newAppointment', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const patientInfo_id = req.body.patientInfo_id;
    const doctorInfo_id = req.body.doctorInfo_id;
    const date = req.body.date;
    //Only a user with the role of patient can access these endpoints. 
    if (req.headers['role'] !== 'patient') {
        return res.status(400).send({
            error: "Not Authorized"
        });
    }
    if (!patientInfo_id || !doctorInfo_id || !date) {
        res.status(400);
        return res.send({
            message: 'Some information is missing'
        });
    }
    // Si tengo mi description
    // Debo crear un nuevo TODO y guardarlo a la DB
    const newApplistAppointmentId = yield (0, appointment_repo_1.createAppointment)(patientInfo_id, doctorInfo_id, date);
    res.status(201);
    res.send({
        newApplistAppointmentId
    });
}));
exports.Appointment.get('/:appointmentId', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const appointmentId = Number(req.params['appointmentId']);
    //Only a user with the role of patient can access these endpoints. 
    if (req.headers['role'] !== 'patient') {
        return res.status(402).send({
            error: "Not Authorized"
        });
    }
    if (appointmentId <= 0) {
        res.status(400);
        return res.send({
            error: 'Invalid id'
        });
    }
    const foundAppointment = yield (0, appointment_repo_1.fetchAppointmentById)(appointmentId);
    if (!foundAppointment) {
        res.status(400);
        return res.send({
            error: 'Appointment not found.'
        });
    }
    // TodoId es mayor a 0 y Todo con el TodoId existe en la DB
    res.status(200);
    res.send(foundAppointment);
}));
//Create an endpoint that reads from the same Model created in the previous model but only returns the appointments assigned to this doctor 
exports.Appointment.get('/doctorAppointments/:doctorId', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const doctorId = String(req.params['doctorId']);
    //Only a user with the role of doctor can access these endpoints. 
    if (req.headers['role'] !== 'doctor') {
        return res.status(401).send({
            error: "Not Authorized"
        });
    }
    if (Number(doctorId) <= 0) {
        res.status(400);
        return res.send({
            error: 'Invalid id'
        });
    }
    const foundAppointment = yield (0, appointment_repo_1.fetchAppointmentByDoctorId)(doctorId);
    if (!foundAppointment) {
        res.status(400);
        return res.send({
            error: 'Appointment not found.'
        });
    }
    // TodoId es mayor a 0 y Todo con el TodoId existe en la DB
    res.status(200);
    res.send(foundAppointment);
}));
exports.Appointment.get('/AdminAppointmentsDoctors/:doctorId', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const doctorId = String(req.params['doctorId']);
    //Only a user with the role of doctor can access these endpoints. 
    if (req.headers['role'] !== 'admin') {
        return res.status(401).send({
            error: "Not Authorized"
        });
    }
    if (Number(doctorId) <= 0) {
        res.status(400);
        return res.send({
            error: 'Invalid id'
        });
    }
    const foundAppointment = yield (0, appointment_repo_1.fetchAppointmentByDoctorId)(doctorId);
    if (!foundAppointment) {
        res.status(400);
        return res.send({
            error: 'Appointment not found.'
        });
    }
    // TodoId es mayor a 0 y Todo con el TodoId existe en la DB
    res.status(200);
    res.send(foundAppointment);
}));
//Filter by Patient 
exports.Appointment.get('/PatientAppointments/:patientId', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const patientId = String(req.params['patientId']);
    let recieveRole = req.headers['role'];
    //Only a user with the role of doctor can access these endpoints. 
    if (recieveRole !== 'doctor') {
        return res.status(401).send({
            error: "Not Authorized"
        });
    }
    if (Number(patientId) <= 0) {
        res.status(400);
        return res.send({
            error: 'Invalid id'
        });
    }
    const foundAppointment = yield (0, appointment_repo_1.fetchAppointmentByPatientId)(patientId);
    if (!foundAppointment) {
        res.status(400);
        return res.send({
            error: 'Todo not found.'
        });
    }
    // TodoId es mayor a 0 y Todo con el TodoId existe en la DB
    res.status(200);
    res.send(foundAppointment);
}));
//[Appointments] Create a filter where you can pass a patientId and only see the appointments of that user 
exports.Appointment.get('/AdminAppointmentsPatients/:patientId', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const patientId = String(req.params['patientId']);
    let recieveRole = req.headers['role'];
    //Only a user with the role of doctor can access these endpoints. 
    if (recieveRole !== 'admin') {
        return res.status(401).send({
            error: "Not Authorized"
        });
    }
    if (Number(patientId) <= 0) {
        res.status(400);
        return res.send({
            error: 'Invalid id'
        });
    }
    const foundAppointment = yield (0, appointment_repo_1.fetchAppointmentByPatientId)(patientId);
    if (!foundAppointment) {
        res.status(400);
        return res.send({
            error: 'Appointment not found.'
        });
    }
    // TodoId es mayor a 0 y Todo con el TodoId existe en la DB
    res.status(200);
    res.send(foundAppointment);
}));
//Filter by date 
exports.Appointment.get('/DateAppointment/putDate', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const date = req.body.date;
    //Only a user with the role of doctor can access these endpoints. 
    if (req.headers['role'] !== 'doctor') {
        return res.status(401).send({
            error: "Not Authorized"
        });
    }
    if (!date) {
        res.status(400);
        return res.send({
            error: 'Invalid format for date'
        });
    }
    const foundAppointment = yield (0, appointment_repo_1.fetchAppointmentByDate)(date);
    if (!foundAppointment) {
        res.status(400);
        return res.send({
            error: 'Appointment not found.'
        });
    }
    // TodoId es mayor a 0 y Todo con el TodoId existe en la DB
    res.status(200);
    res.send(foundAppointment);
}));
exports.Appointment.get('/admin/DeletesAppointment/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //Only a user with the role of admin can access these endpoints. 
    if (req.headers['role'] !== 'admin') {
        return res.status(401).send({
            error: "Not Authorized"
        });
    }
    const foundAppointment = yield (0, appointment_repo_1.fetchAppointmentByIsDelete)(false);
    if (!foundAppointment) {
        res.status(400);
        return res.send({
            error: 'Appointments not found.'
        });
    }
    // TodoId es mayor a 0 y Todo con el TodoId existe en la DB
    res.status(200);
    res.send(foundAppointment);
}));
//Create an endpoint that allows a doctor to modify the date or time of the appointment and only that. 
exports.Appointment.put('/:appointmentId', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const appointmentId = Number(req.params['appointmentId']);
    const body = req.body;
    //SOnly a user with the role of doctor can access these endpoints. 
    if (req.headers['role'] !== 'doctor') {
        return res.status(402).send({
            error: "Not Authorized"
        });
    }
    if (appointmentId <= 0) {
        res.status(400);
        return res.send({
            error: 'Invalid id'
        });
    }
    const affectedRows = yield (0, appointment_repo_1.updateAppointmentById)(appointmentId, body);
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
    const foundAppointment = yield (0, appointment_repo_1.fetchAppointmentById)(appointmentId);
    res.status(200);
    return res.send(foundAppointment);
}));
//The delete needs to be soft (do not erase the record) 
exports.Appointment.delete('/:appointmentId', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const appointmentId = Number(req.params['appointmentId']);
    //Only a user with the role of patient can access these endpoints. 
    if (req.headers['role'] !== 'patient') {
        return res.status(402).send({
            error: "Not Authorized"
        });
    }
    if (appointmentId <= 0) {
        res.status(400);
        return res.send({
            error: 'Invalid id'
        });
    }
    const ar = yield (0, appointment_repo_1.deleteAppointmentById)(appointmentId);
    if (!ar) {
        return res.status(400).send({
            error: 'Cannot delete'
        });
    }
    return res.sendStatus(200);
}));
