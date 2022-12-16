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
exports.createPatientInfo = exports.listPatient = void 0;
const user_model_1 = require("../models/user.model");
// Create operation
const listPatient = (status) => __awaiter(void 0, void 0, void 0, function* () {
    const res = yield user_model_1.User.findAll({
        attributes: ['id'],
        where: {
            status: true
        }
    });
    return res;
});
exports.listPatient = listPatient;
const createPatientInfo = (display_name, email, password) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield user_model_1.User.create({
            display_name,
            email,
            password
        });
        return user;
    }
    catch (error) {
        console.error(error);
    }
});
exports.createPatientInfo = createPatientInfo;
