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
exports.getTotalProviers = exports.getProvidersQuery = void 0;
const db_1 = require("../../utils/db");
const getProvidersQuery = ({ page = '0', limit = '10', rfcFilter = '', nameFilter = '', clabeFilter = '' }) => {
    return new Promise((resolve, reject) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            console.log(page, limit);
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
                    }
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
                    created_at: 'desc'
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
                    }
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
