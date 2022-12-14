"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAuthorized = void 0;
const isAuthorized = (options) => {
    return (req, res, next) => {
        const { uid, email, role } = res.locals;
        const { userId } = req.params;
        if (email === 'SUPER USER') {
            next();
        }
        //COM
        if (options.allowSameUser && userId && userId === uid) {
            next();
        }
        if (!role) {
            return res.status(403).send();
        }
        if (options.roles.includes(role)) {
            return next();
        }
        return res.status(403).send();
    };
};
exports.isAuthorized = isAuthorized;
