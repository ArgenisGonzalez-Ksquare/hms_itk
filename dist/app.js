"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const User_routes_1 = require("./routes/User.routes");
const patienInfo_routes_1 = require("./routes/patienInfo.routes");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use('/user', User_routes_1.UserRouter, User_routes_1.User);
app.use('/patient', patienInfo_routes_1.PatientInfo);
app.get('/', (req, res) => {
    res.send('VIVEEEEEEEEEEE');
});
exports.default = app;
// A.P.I
