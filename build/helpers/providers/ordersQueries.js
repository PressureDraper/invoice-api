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
exports.deleteOrderQuery = exports.updateOrderQuery = exports.createOrderDetailQuery = exports.createOrderQuery = exports.getTotalOrdersQuery = exports.getInfOrdersQuery = exports.getOrdersQuery = void 0;
const db_1 = require("../../utils/db");
const getOrdersQuery = ({ page = '0', limit = '10', groupFilter, typeFilter = '', numberFilter = '' }) => {
    return new Promise((resolve, reject) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const rowsPerPage = parseInt(limit);
            const min = ((parseInt(page) + 1) * rowsPerPage) - rowsPerPage;
            let listOrders = yield db_1.db.rfn_pedidos.findMany({
                where: {
                    id_grupo: groupFilter ? groupFilter : {},
                    tipo: typeFilter ? { contains: typeFilter } : {},
                    numero: numberFilter ? { contains: numberFilter } : {}
                },
                include: {
                    rfn_pedidos_detalles: true
                },
                orderBy: {
                    id: 'desc'
                },
                skip: min,
                take: rowsPerPage
            });
            listOrders ? (listOrders.forEach((elm) => {
                elm.rfn_pedidos_detalles.length !== 0 && elm.rfn_pedidos_detalles.forEach((detail) => {
                    detail['id'] = parseInt(detail['id'].toString());
                    detail['id_clave'] = parseInt(detail['id_clave'].toString());
                    detail['id_pedido'] = parseInt(detail['id_pedido'].toString());
                });
                elm['id'] = parseInt(elm['id'].toString());
                elm['id_grupo'] = parseInt(elm['id_grupo'].toString());
            })) : null;
            resolve(listOrders);
        }
        catch (err) {
            reject(err);
        }
    }));
};
exports.getOrdersQuery = getOrdersQuery;
const getInfOrdersQuery = (id) => {
    return new Promise((resolve, reject) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const order = yield db_1.db.rfn_pedidos.findUnique({
                where: {
                    id
                },
                include: {
                    rfn_pedidos_detalles: true
                }
            });
            order ? (order.rfn_pedidos_detalles.length !== 0 && (order.rfn_pedidos_detalles[0]['id'] = parseInt(order.rfn_pedidos_detalles[0]['id'].toString()),
                order.rfn_pedidos_detalles[0]['id_clave'] = parseInt(order.rfn_pedidos_detalles[0]['id_clave'].toString()),
                order.rfn_pedidos_detalles[0]['id_pedido'] = parseInt(order.rfn_pedidos_detalles[0]['id_pedido'].toString())),
                order['id'] = parseInt(order['id'].toString()),
                order['id_grupo'] = parseInt(order['id_grupo'].toString())) : null;
            resolve(order);
        }
        catch (err) {
            reject(err);
        }
    }));
};
exports.getInfOrdersQuery = getInfOrdersQuery;
const getTotalOrdersQuery = ({ groupFilter, typeFilter = '', numberFilter = '' }) => {
    return new Promise((resolve, reject) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            let countListOrders = yield db_1.db.rfn_pedidos.count({
                where: {
                    id_grupo: groupFilter ? groupFilter : {},
                    tipo: typeFilter ? { contains: typeFilter } : {},
                    numero: numberFilter ? { contains: numberFilter } : {}
                }
            });
            countListOrders ? (resolve(countListOrders)) : resolve(0);
        }
        catch (err) {
            reject(err);
        }
    }));
};
exports.getTotalOrdersQuery = getTotalOrdersQuery;
const createOrderQuery = ({ numero = 'S/N', tipo, id_grupo }) => {
    return new Promise((resolve, reject) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            yield db_1.db.rfn_pedidos.create({
                data: {
                    numero,
                    tipo,
                    id_grupo
                }
            });
            resolve(true);
        }
        catch (err) {
            reject(false);
        }
    }));
};
exports.createOrderQuery = createOrderQuery;
const createOrderDetailQuery = ({ importe, id_clave, id_pedido }) => {
    return new Promise((resolve, reject) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const order = yield db_1.db.rfn_pedidos.findUnique({
                where: {
                    id: id_pedido
                }
            });
            order ? (yield db_1.db.rfn_pedidos_detalles.create({
                data: {
                    importe,
                    id_clave,
                    id_pedido
                }
            }),
                resolve(true)) : resolve(false);
        }
        catch (err) {
            reject(err);
        }
    }));
};
exports.createOrderDetailQuery = createOrderDetailQuery;
const updateOrderQuery = ({ numero, tipo, id_grupo, order_id }) => {
    return new Promise((resolve, reject) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            /* const [ numero ] = Object.keys(param); */
            const order = yield db_1.db.rfn_pedidos.findUnique({
                where: {
                    id: order_id
                }
            });
            order ? (yield db_1.db.rfn_pedidos.update({
                where: {
                    id: order_id
                },
                data: {
                    numero,
                    tipo,
                    id_grupo
                }
            }),
                resolve(true)) : resolve(false);
        }
        catch (err) {
            reject(false);
        }
    }));
};
exports.updateOrderQuery = updateOrderQuery;
const deleteOrderQuery = (id) => {
    return new Promise((resolve, reject) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const order = yield db_1.db.rfn_pedidos.findUnique({
                where: {
                    id: id
                }
            });
            order ? (yield db_1.db.rfn_pedidos.update({
                where: {
                    id
                },
                data: {
                    deleted_at: new Date().toISOString()
                }
            }),
                resolve(true)) : resolve(false);
        }
        catch (err) {
            reject(err);
        }
    }));
};
exports.deleteOrderQuery = deleteOrderQuery;
