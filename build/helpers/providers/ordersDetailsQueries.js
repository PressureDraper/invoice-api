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
exports.getInfOrdersDetailsQuery = exports.getOrdersDetailsQuery = void 0;
const db_1 = require("../../utils/db");
const getOrdersDetailsQuery = ({ limit = '10', page = '0', amountFilter, keyFilter, orderFilter }) => {
    return new Promise((resolve, reject) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const rowsPerPage = parseInt(limit);
            const min = ((parseInt(page) + 1) * rowsPerPage) - rowsPerPage;
            let listOrdersDetails = yield db_1.db.rfn_pedidos_detalles.findMany({
                where: {
                    importe: amountFilter ? amountFilter : {},
                    id_clave: keyFilter ? keyFilter : {},
                    id_pedido: orderFilter ? orderFilter : {}
                },
                orderBy: {
                    id: 'desc'
                },
                skip: min,
                take: rowsPerPage
            });
            listOrdersDetails ? (listOrdersDetails.forEach((elm, index) => {
                elm['id'] = parseInt(elm['id'].toString());
                elm['id_clave'] = parseInt(elm['id_clave'].toString());
                elm['id_pedido'] = parseInt(elm['id_pedido'].toString());
            })) : null;
            resolve(listOrdersDetails);
        }
        catch (err) {
            reject(err);
        }
    }));
};
exports.getOrdersDetailsQuery = getOrdersDetailsQuery;
const getInfOrdersDetailsQuery = (id) => {
    return new Promise((resolve, reject) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const order = yield db_1.db.rfn_pedidos_detalles.findUnique({
                where: {
                    id
                }
            });
            order ? (order['id'] = parseInt(order['id'].toString()),
                order['id_clave'] = parseInt(order['id_clave'].toString()),
                order['id_pedido'] = parseInt(order['id_pedido'].toString())) : null;
            resolve(order);
        }
        catch (err) {
            reject(err);
        }
    }));
};
exports.getInfOrdersDetailsQuery = getInfOrdersDetailsQuery;
