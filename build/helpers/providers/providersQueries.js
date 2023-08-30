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
exports.deleteProviderQuery = exports.createProviderQuery = exports.updateProviderQuery = exports.getTotalProviers = exports.getProvidersQuery = void 0;
const db_1 = require("../../utils/db");
const getProvidersQuery = ({ page = '0', limit = '10', rfcFilter = '', nameFilter = '', clabeFilter = '' }) => {
    return new Promise((resolve, reject) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const rowsPerPage = parseInt(limit);
            const min = ((parseInt(page) + 1) * rowsPerPage) - rowsPerPage;
            let listProviders = yield db_1.db.cat_proveedores.findMany({
                where: {
                    rfc: {
                        contains: rfcFilter
                    },
                    nombre: {
                        contains: nameFilter
                    },
                    clabe: {
                        contains: clabeFilter
                    },
                    estatus: 'Activo'
                },
                select: {
                    id: true,
                    rfc: true,
                    nombre: true,
                    condpago: true,
                    clabe: true,
                    created_at: true
                },
                orderBy: {
                    id: 'desc'
                },
                skip: min,
                take: rowsPerPage,
            });
            resolve(listProviders);
        }
        catch (err) {
            console.log(err);
            resolve([]);
        }
    }));
};
exports.getProvidersQuery = getProvidersQuery;
const getTotalProviers = ({ rfcFilter = '', nameFilter = '', clabeFilter = '' }) => {
    return new Promise((resolve, reject) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            let countListProviders = yield db_1.db.cat_proveedores.count({
                where: {
                    rfc: {
                        contains: rfcFilter
                    },
                    nombre: {
                        contains: nameFilter
                    },
                    clabe: {
                        contains: clabeFilter
                    },
                    estatus: 'Activo'
                },
            });
            resolve(countListProviders);
        }
        catch (err) {
            console.log(err);
            resolve(0);
        }
    }));
};
exports.getTotalProviers = getTotalProviers;
const updateProviderQuery = ({ clabe, id_provider }) => {
    return new Promise((resolve, reject) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            yield db_1.db.cat_proveedores.update({
                where: {
                    id: id_provider
                },
                data: {
                    clabe,
                }
            });
            resolve(true);
        }
        catch (err) {
            console.log(err);
            reject(false);
        }
    }));
};
exports.updateProviderQuery = updateProviderQuery;
const createProviderQuery = ({ nombre, rfc, domicilio = null, noexterior = null, nointerior = null, colonia = null, ciudad = null, estado = null, pais = null, cp = null, localidad = null, condpago = null, telefono = null, cuentad = null, cuentah = null, ivad = null, curp = null, clabe = null, ivah = null }) => {
    return new Promise((resolve, reject) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            yield db_1.db.cat_proveedores.create({
                data: {
                    rfc,
                    nombre,
                    domicilio,
                    noexterior,
                    nointerior,
                    colonia,
                    ciudad,
                    estado,
                    pais,
                    cp,
                    localidad,
                    condpago,
                    telefono,
                    cuentad,
                    cuentah,
                    ivad,
                    ivah,
                    estatus: 'Activo',
                    curp,
                    clabe,
                }
            });
            resolve(true);
        }
        catch (err) {
            console.log(err);
            reject(false);
        }
    }));
};
exports.createProviderQuery = createProviderQuery;
const deleteProviderQuery = (id) => {
    return new Promise((resolve, reject) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            yield db_1.db.cat_proveedores.update({
                where: {
                    id
                },
                data: {
                    estatus: 'Inactivo'
                }
            });
        }
        catch (err) {
            console.log(err);
            resolve(false);
        }
    }));
};
exports.deleteProviderQuery = deleteProviderQuery;
