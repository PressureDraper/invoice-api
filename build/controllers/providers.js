"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProviders = void 0;
const getProviders = (req, res) => {
    res.status(200).json({
        ok: true,
        msg: 'Is ok'
    });
};
exports.getProviders = getProviders;
