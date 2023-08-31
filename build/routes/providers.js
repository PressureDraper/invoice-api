"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/*
    Prefix: /providers
*/
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const providers_1 = require("../controllers/providers");
const validate_fields_1 = require("../middlewares/validate-fields");
const router = (0, express_1.Router)();
router.get('/', providers_1.getProviders);
router.get('/:id', providers_1.getInfoProvider);
router.post('/', [
    (0, express_validator_1.check)('rfc', 'El campo rfc es obligatorio').not().isEmpty(),
    (0, express_validator_1.check)('nombre', 'El campo nombre es obligatorio').not().isEmpty(),
    validate_fields_1.validateFields
], providers_1.createProvider);
router.put('/:id', [
    (0, express_validator_1.check)('clabe', 'El campo clabe es obligatorio').not().isEmpty(),
    validate_fields_1.validateFields
], providers_1.updateProvider);
router.delete('/:id', providers_1.deleteProvider);
router.get('/total/count', providers_1.getProvidersTotal);
exports.default = router;
