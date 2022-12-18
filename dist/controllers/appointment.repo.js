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
exports.deleteAppointmentById = exports.updateAppointmentById = exports.fetchAppointmentByDoctorId = exports.fetchAppointmentById = exports.createAppointment = exports.listAppointment = exports.paginatedList = void 0;
const appointment_model_1 = require("../models/appointment.model");
// Appointment MODULE
const paginatedList = (pLimit, pOffset) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const res = yield appointment_model_1.Appointment.findAll({
            attributes: ['id', 'patientInfo_id', 'doctorInfo_id', 'date'],
            limit: pLimit,
            offset: pOffset,
            where: {
                is_active: false
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
//Create a series of endpoints that need to LIST, Read, Create and Delete appointments 
const listAppointment = (is_active) => __awaiter(void 0, void 0, void 0, function* () {
    const res = yield appointment_model_1.Appointment.findAll({
        attributes: ['id', 'patientInfo_id', 'doctorInfo_id', 'date'],
        where: {
            is_active: true
        }
    });
    return res;
});
exports.listAppointment = listAppointment;
const createAppointment = (patientInfo_id, doctorInfo_id, date) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const AppointmentResult = yield appointment_model_1.Appointment.create({
            patientInfo_id,
            doctorInfo_id,
            date
        });
        return AppointmentResult;
    }
    catch (error) {
        console.error(error);
        return null;
    }
});
exports.createAppointment = createAppointment;
const fetchAppointmentById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const foundAppointment = yield appointment_model_1.Appointment.findByPk(id);
        return foundAppointment;
    }
    catch (error) {
        console.error(error);
        return null;
    }
});
exports.fetchAppointmentById = fetchAppointmentById;
const fetchAppointmentByDoctorId = (doctor_id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const foundAppointment = yield appointment_model_1.Appointment.findAll({
            where: {
                doctorInfo_id: doctor_id
            }
        });
        return foundAppointment;
    }
    catch (error) {
        console.error(error);
        return null;
    }
});
exports.fetchAppointmentByDoctorId = fetchAppointmentByDoctorId;
const updateAppointmentById = (id, AppointmentModel) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const foo = yield appointment_model_1.Appointment.update({
            date: AppointmentModel.date
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
exports.updateAppointmentById = updateAppointmentById;
const deleteAppointmentById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const foo = yield appointment_model_1.Appointment.update({
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
exports.deleteAppointmentById = deleteAppointmentById;
