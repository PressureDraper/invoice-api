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
exports.getInfOrdersDetails = exports.getOrdersDetails = void 0;
const ordersDetailsQueries_1 = require("../helpers/providers/ordersDetailsQueries");
const getOrdersDetails = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const params = req.query;
        let queryOrders = yield (0, ordersDetailsQueries_1.getOrdersDetailsQuery)(Object.assign({}, params));
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
exports.getOrdersDetails = getOrdersDetails;
const getInfOrdersDetails = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = parseInt(req.params.id);
        const order = yield (0, ordersDetailsQueries_1.getInfOrdersDetailsQuery)(id);
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
exports.getInfOrdersDetails = getInfOrdersDetails;
