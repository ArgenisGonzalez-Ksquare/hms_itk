"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.User = exports.UserRouter = void 0;
const express_1 = require("express");
const firebase_1 = require("../firebase");
const isAuthentificated_1 = require("../middlewares/isAuthentificated");
const isAuthorized_1 = require("../middlewares/isAuthorized");
const admin = __importStar(require("firebase-admin"));
exports.UserRouter = (0, express_1.Router)();
exports.User = (0, express_1.Router)();
/*
----------------------------------------------------------------------
                Auth Module - Requirements
----------------------------------------------------------------------

    Allow a patient to sign up to your system by creating an endpoint without needing to authenticate (DONE)
    Only allow admin users to be created via your DBMS shell and not expose this role to your server by any means. (DONE)
    Create a login endpoint where you need to compare the password via Hashing (you can skip all of this if you wish by using Firebase) and return a session token using JWT (DONE)
    Create a middleware that will check if a user is authenticated and what role it has (DONE)
    A user can call an endpoint to disable its account (this is a soft-delete operation) is_active = true|false (DONE)
    These requirements can be changed later.

    ******************************************************************
    ------------------------------------------------------------------
*/
//Allow a patient to sign up to your system by creating an endpoint without needing to authenticate 
exports.UserRouter.post('/newUser/patient', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { uid, displayName, email, password, role } = req.body;
    if (!displayName || !email || !password) {
        return res.status(400).send({ error: 'Missing fields' });
    }
    try {
        const userId = yield (0, firebase_1.createUser)(displayName, email, password, 'patient');
        console.log(userId);
        //const user = await createUserOnPostgres(userId, displayName, email, password, 'patient')
        return res.status(201).send({
            userId
        });
    }
    catch (error) {
        res.status(500).send({ error: 'something went wrong' });
    }
}));
exports.UserRouter.get('/:userId', isAuthentificated_1.isAuthenticated, (0, isAuthorized_1.isAuthorized)({ roles: ['patient', 'admin'], allowSameUser: true }), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // Dos formas de obtener el userId
    const { userId } = req.params;
    // 2da forma
    const { uid, role } = res.locals;
    try {
        const user = yield (0, firebase_1.readUser)(userId);
        return res.status(200).send(user);
    }
    catch (error) {
        console.error(error);
        return res.status(500).send({ error: 'something went wrong' });
    }
}));
//Disable Account
exports.UserRouter.patch('/disable/:uid', isAuthentificated_1.isAuthenticated, (0, isAuthorized_1.isAuthorized)({ roles: ['doctor', 'patient'], allowSameUser: true }), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let uid = req.params.uid;
    const gUser = yield admin.auth().getUser(uid);
    if (gUser.disabled) {
        return res.status(200).send({ message: 'the account is already disable' });
    }
    try {
        const updatedUser = yield (0, firebase_1.disableUser)(uid, true);
        if (!updatedUser) {
            return res.status(400).send({
                error: "invalid id"
            });
        }
        res.status(201).send({
            updatedUser
        });
    }
    catch (error) {
        res.status(500).send({ error: 'something went wrong' });
    }
}));
/* ***************************************************
                Admin Module Requirement
   ***************************************************

    Create an endpoint where an admin can create a new doctor account (user). (DONE)
    Create an endpoint that can modify the is_active property from the User model back to true. (DONE)

*/
/* Create an endpoint where an admin can create a new doctor account (user). */
exports.UserRouter.post('/newUser/doctor', isAuthentificated_1.isAuthenticated, (0, isAuthorized_1.isAuthorized)({ roles: ['admin'], allowSameUser: false }), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { uid, displayName, email, password, role } = req.body;
    if (!displayName || !email || !password) {
        return res.status(400).send({ error: 'Missing fields' });
    }
    try {
        const userId = yield (0, firebase_1.createUser)(displayName, email, password, 'doctor');
        console.log(userId);
        return res.status(201).send({
            userId
        });
    }
    catch (error) {
        res.status(500).send({ error: 'something went wrong' });
    }
}));
/* Create an endpoint that can modify the is_active property from the User model back to true. */
exports.UserRouter.patch('/enable/:uid', isAuthentificated_1.isAuthenticated, (0, isAuthorized_1.isAuthorized)({ roles: ['admin'], allowSameUser: false }), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let uid = req.params.uid;
    const gUser = yield admin.auth().getUser(uid);
    if (!gUser.disabled) {
        return res.status(200).send({ message: 'the account is already enable' });
    }
    try {
        const user = yield (0, firebase_1.disableUser)(uid, false);
        if (!user) {
            return res.status(400).send({
                error: "invalid id"
            });
        }
        res.status(200).send(user);
    }
    catch (error) {
        res.status(500).send({ error: 'something went wrong' });
    }
}));
