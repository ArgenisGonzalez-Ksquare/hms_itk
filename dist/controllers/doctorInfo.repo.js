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
exports.deleteDoctorById = exports.updateDoctorById = exports.fetchDoctorById = exports.createDoctorInfo = exports.listDoctor = exports.paginatedList = void 0;
const doctorInfo_model_1 = require("../models/doctorInfo.model");
// Create operation
const paginatedList = (pLimit, pOffset) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const res = yield doctorInfo_model_1.DoctorInfo.findAll({
            attributes: ['id', 'full_name', 'birthdate'],
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
const listDoctor = (is_active) => __awaiter(void 0, void 0, void 0, function* () {
    const res = yield doctorInfo_model_1.DoctorInfo.findAll({
        attributes: ['id', 'full_name', 'birthdate'],
        where: {
            is_active: true
        }
    });
    return res;
});
exports.listDoctor = listDoctor;
const createDoctorInfo = (full_name, user_id, birthdate) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const Doctor = yield doctorInfo_model_1.DoctorInfo.create({
            full_name,
            user_id,
            birthdate
        });
        return Doctor;
    }
    catch (error) {
        console.error(error);
        return null;
    }
});
exports.createDoctorInfo = createDoctorInfo;
const fetchDoctorById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const foundDoctor = yield doctorInfo_model_1.DoctorInfo.findByPk(id);
        return foundDoctor;
    }
    catch (error) {
        console.error(error);
        return null;
    }
});
exports.fetchDoctorById = fetchDoctorById;
const updateDoctorById = (id, DoctorModel) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const foo = yield doctorInfo_model_1.DoctorInfo.update({
            full_name: DoctorModel.full_name,
            birthdate: DoctorModel.birthdate,
            is_active: DoctorModel.is_active
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
exports.updateDoctorById = updateDoctorById;
const deleteDoctorById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const foo = yield doctorInfo_model_1.DoctorInfo.update({
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
exports.deleteDoctorById = deleteDoctorById;
