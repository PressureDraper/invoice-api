"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const orders_1 = require("../controllers/orders");
const validate_fields_1 = require("../middlewares/validate-fields");
const router = (0, express_1.Router)();
router.get('/', orders_1.getOrders);
router.get('/:id', orders_1.getInfOrders);
router.get('/total/count', orders_1.getTotalOrders);
router.post('/', [
    (0, express_validator_1.check)('tipo', 'El campo tipo es obligatorio').not().isEmpty(),
    (0, express_validator_1.check)('id_grupo', 'El campo id_grupo es obligatorio').not().isEmpty(),
    validate_fields_1.validateFields
], orders_1.createOrder);
router.put('/:id', orders_1.updateOrder);
router.delete('/:id', orders_1.deleteOrder);
exports.default = router;
