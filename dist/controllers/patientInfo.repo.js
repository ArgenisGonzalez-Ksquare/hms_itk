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
exports.updatePatientById = exports.fetchPatientById = exports.createPatientInfo = exports.listPatient = void 0;
const patientInfo_model_1 = require("../models/patientInfo.model");
// Create operation
const listPatient = (status) => __awaiter(void 0, void 0, void 0, function* () {
    const res = yield patientInfo_model_1.PatientInfo.findAll({
        attributes: ['id'],
        where: {
            status: true
        }
    });
    return res;
});
exports.listPatient = listPatient;
const createPatientInfo = (full_name, user_id, birthdate) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const patient = yield patientInfo_model_1.PatientInfo.create({
            full_name,
            user_id,
            birthdate
        });
        return patient;
    }
    catch (error) {
        console.error(error);
    }
});
exports.createPatientInfo = createPatientInfo;
const fetchPatientById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const foundPatient = yield patientInfo_model_1.PatientInfo.findByPk(id);
        return foundPatient;
    }
    catch (error) {
        console.error(error);
        return null;
    }
});
exports.fetchPatientById = fetchPatientById;
const updatePatientById = (id, patientModel) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const foo = yield patientInfo_model_1.PatientInfo.update({
            full_name: patientModel.full_name,
            birthdate: patientModel.birthdate,
            status: patientModel.status
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
exports.updatePatientById = updatePatientById;
/*
export const deleteTodoById = async (id: number) => {
    try {
        const foo = await Todo.destroy({
            where: {
                id: id
            }
        })
        console.log(foo);
        return foo;
    } catch (error) {
        console.error(error);
        return null;
    }
} */ 
