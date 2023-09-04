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
exports.getTotalOrders = exports.getInfOrders = exports.getOrders = void 0;
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
        const id = req.params.id;
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
