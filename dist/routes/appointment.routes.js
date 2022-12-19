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
const appointment_repo_1 = require("../controllers/appointment.repo");
const isAuthentificated_1 = require("../middlewares/isAuthentificated");
const isAuthorized_1 = require("../middlewares/isAuthorized");
exports.Appointment = (0, express_1.Router)();
/* ------------------------------------------------------------------------------------
    Patient Module - Requirements
   ------------------------------------------------------------------------------------


    Create a series of endpoints that need to LIST, Read, Create and Delete appointments
    Create pagination for this resource
    The delete needs to be soft (do not erase the record)
    Only a user with the role of patient can access these endpoints.

    ************************************************************************************
    ------------------------------------------------------------------------------------
 */
/* ************************* L I S T ****************************************** */
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
/* ************************** C R E A T E ******************************************* */
exports.Appointment.post('/newAppointment', isAuthentificated_1.isAuthenticated, (0, isAuthorized_1.isAuthorized)({ roles: ['patient'], allowSameUser: false }), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(res.locals);
    const patientInfo_id = req.body.patientInfo_id;
    const doctorInfo_id = req.body.doctorInfo_id;
    const date = req.body.date;
    if (!patientInfo_id || !doctorInfo_id || !date) {
        res.status(400);
        return res.send({
            message: 'Some information is missing'
        });
    }
    const newApplistAppointmentId = yield (0, appointment_repo_1.createAppointment)(patientInfo_id, doctorInfo_id, date);
    res.status(201);
    res.send({
        newApplistAppointmentId
    });
}));
/* ************************** R E A D ******************************************* */
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
/* ************************** D E L E T E ******************************************* */
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
/* ************************** P A G I N A T I O N ******************************************* */
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
/* ------------------------------------------------------------------------------------
    Doctor Module - Requirements
   ------------------------------------------------------------------------------------


    Create an endpoint that reads from the same Model created in the previous model but only returns the appointments assigned to this doctor
    Create an endpoint that allows a doctor to modify the date or time of the appointment and only that.
    Create filters that allow a doctor to get more specific information like byDate, byPatient, and orderBy=asc|desc.
    Create pagination for this resource
    Only a user with the role of doctor can access these endpoints.
    Any requirements of this module can change at a later stage

    ************************************************************************************
    ------------------------------------------------------------------------------------
 */
/* ************************* L I S T ****************************************** */
/* Create an endpoint that reads from the same Model created in the previous model but only returns the appointments assigned to this doctor */
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
/* Create an endpoint that allows a doctor to modify the date or time of the appointment and only that. */
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
/* ------------------------------------------------------------------------------------
    Admin Module - Requirements
   ------------------------------------------------------------------------------------


    Create an endpoint where an admin can create a new doctor account (user).
    Create an endpoint that can modify the is_active property from the User model back to true.
    Create an endpoint that would LIST all the appointments in the table
    [Appointments] Create pagination filters for the previous endpoint
    [Appointments] Create a filter where you can pass a patientId and only see the appointments of that user
    [Appointments] Create a filter where you can pass a doctorId and only see the appointments where the doctor is in charge
    [Appointments] Create a filter where you can receive the information based on is_deleted property
    [Appointments] Create a filter where you can modify the order of the information do this by the patientId and the doctorId
    Any requirements of this module can change at a later stage

    ************************************************************************************
    ------------------------------------------------------------------------------------
 */
//[Appointments] Create a filter where you can pass a doctorId and only see the appointments where the doctor is in charge 
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
//[Appointments] Create a filter where you can receive the information based on is_deleted property 
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
