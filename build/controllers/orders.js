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
exports.deleteOrder = exports.updateOrder = exports.createOrder = exports.getTotalOrders = exports.getInfOrders = exports.getOrders = void 0;
const ordersQueries_1 = require("../helpers/providers/ordersQueries");
const getOrders = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const params = req.query;
        let queryOrders = yield (0, ordersQueries_1.getOrdersQuery)(Object.assign({}, params));
        res.status(200).json({
            ok: true,
            msg: 'Ok',
            data: queryOrders
        });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({
            ok: false,
            msg: 'Server error contact the administrator'
        });
    }
});
exports.getOrders = getOrders;
const getInfOrders = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = parseInt(req.params.id);
        const order = yield (0, ordersQueries_1.getInfOrdersQuery)(id);
        res.status(200).json({
            ok: true,
            msg: 'ok',
            data: order
        });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({
            ok: false,
            msg: 'Server error contact the administrator'
        });
    }
});
exports.getInfOrders = getInfOrders;
const getTotalOrders = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const params = req.query;
        let queryTotalOrders = yield (0, ordersQueries_1.getTotalOrdersQuery)(Object.assign({}, params));
        res.status(200).json({
            ok: true,
            msg: 'ok',
            data: queryTotalOrders
        });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({
            ok: false,
            msg: 'Server error contact the administrator'
        });
    }
});
exports.getTotalOrders = getTotalOrders;
const createOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = req.body;
        console.log(data);
        yield (0, ordersQueries_1.createOrderQuery)(Object.assign({}, data));
        res.status(200).json({
            ok: true,
            msg: 'Record Created',
        });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({
            ok: false,
            msg: 'Server error contact the administrator'
        });
    }
});
exports.createOrder = createOrder;
const updateOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = parseInt(req.params.id);
        const data = req.body;
        const state = yield (0, ordersQueries_1.updateOrderQuery)(Object.assign(Object.assign({}, data), { order_id: id }));
        Object.keys(data).length !== 0 ? (state ?
            res.status(200).json({
                ok: true,
                msg: 'Record updated',
            })
            :
                res.status(404).json({
                    ok: false,
                    msg: 'Record to update not found'
                }))
            :
                res.status(400).json({
                    ok: false,
                    msg: 'No data to update query'
                });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({
            ok: false,
            msg: 'Server error contact the administrator'
        });
    }
});
exports.updateOrder = updateOrder;
const deleteOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = parseInt(req.params.id);
        const state = yield (0, ordersQueries_1.deleteOrderQuery)(id);
        state ?
            res.status(200).json({
                ok: true,
                msg: 'Record deleted',
            })
            :
                res.status(404).json({
                    ok: false,
                    msg: 'Record to delete not found'
                });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({
            ok: false,
            msg: 'Server error contact the administrator'
        });
    }
});
exports.deleteOrder = deleteOrder;
