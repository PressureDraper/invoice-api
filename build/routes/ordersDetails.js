"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const ordersDetails_1 = require("../controllers/ordersDetails");
const router = (0, express_1.Router)();
router.get('/', ordersDetails_1.getOrdersDetails);
exports.default = router;
