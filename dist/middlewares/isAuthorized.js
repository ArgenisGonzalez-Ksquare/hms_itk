"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAuthorized = void 0;
// Sirva como Middleware
// Nos deje configurar que roles tienen acceso a un endpoint
// Nos debe de dejar sobreescribir el permiso si el mismo usuario dueno del recurso quiere accederlo a pesar de no tener permisos
const isAuthorized = (options) => {
    return (req, res, next) => {
        const { uid, email, role } = res.locals;
        const { userId } = req.params;
        if (email === 'SUPER USER') {
            return next();
        }
        if (!role) {
            return res.status(403).send();
        }
        if (options.roles.includes(role)) {
            return next();
        }
        if (options.allowSameUser && userId && userId === uid) {
            console.log('noooo');
            return next();
        }
        else {
            return res.status(403).send('No Auth');
        }
        return res.status(403).send();
    };
};
exports.isAuthorized = isAuthorized;
