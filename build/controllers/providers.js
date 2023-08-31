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
exports.deleteProvider = exports.createProvider = exports.updateProvider = exports.getProvidersTotal = exports.getInfoProvider = exports.getProviders = void 0;
const providersQueries_1 = require("../helpers/providers/providersQueries");
const db_1 = require("../utils/db");
const getProviders = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const params = req.query;
        let queryProviders = yield (0, providersQueries_1.getProvidersQuery)(Object.assign({}, params));
        res.status(200).json({
            ok: true,
            msg: 'Ok',
            data: queryProviders
        });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({
            ok: false,
            msg: 'Server error contact with the administrator'
        });
    }
});
exports.getProviders = getProviders;
const getInfoProvider = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = parseInt(req.params.id);
        const provider = yield (0, providersQueries_1.getInfoProviderQuery)(id);
        res.status(200).json({
            ok: true,
            msg: 'Ok',
            data: provider
        });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({
            ok: false,
            msg: 'Server error contact with the administrator'
        });
    }
});
exports.getInfoProvider = getInfoProvider;
const getProvidersTotal = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const params = req.query;
        let queryTotalProviders = yield (0, providersQueries_1.getTotalProviersQuery)(Object.assign({}, params));
        res.status(200).json({
            ok: true,
            msg: 'Ok',
            data: queryTotalProviders
        });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({
            ok: false,
            msg: 'Server error contact with the administrator'
        });
    }
});
exports.getProvidersTotal = getProvidersTotal;
const updateProvider = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = parseInt(req.params.id);
        const provider = yield db_1.db.cat_proveedores.findUnique({ where: { id } });
        if (!provider) {
            return res.status(404).json({
                ok: false,
                msg: 'Record to update not found.'
            });
        }
        const { clabe } = req.body;
        yield (0, providersQueries_1.updateProviderQuery)({ id_provider: id, clabe });
        res.status(200).json({
            ok: true,
            msg: 'Record Updated',
        });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({
            ok: false,
            msg: 'Server error contact with the administrator'
        });
    }
});
exports.updateProvider = updateProvider;
const createProvider = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = req.body;
        yield (0, providersQueries_1.createProviderQuery)(Object.assign({}, data));
        res.status(200).json({
            ok: true,
            msg: 'Record Created',
        });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({
            ok: false,
            msg: 'Server error contact with the administrator'
        });
    }
});
exports.createProvider = createProvider;
const deleteProvider = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = parseInt(req.params.id);
        const provider = yield db_1.db.cat_proveedores.findUnique({ where: { id } });
        if (!provider) {
            return res.status(404).json({
                ok: false,
                msg: 'Record to update not found.'
            });
        }
        yield (0, providersQueries_1.deleteProviderQuery)(id);
        res.status(200).json({
            ok: true,
            msg: 'Record Deleted',
        });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({
            ok: false,
            msg: 'Server error contact with the administrator'
        });
    }
});
exports.deleteProvider = deleteProvider;
