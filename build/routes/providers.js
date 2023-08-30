"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/*
    Prefix: /providers
*/
const express_1 = require("express");
const providers_1 = require("../controllers/providers");
const router = (0, express_1.Router)();
router.get('/', providers_1.getProviders);
router.get('/total', providers_1.getProvidersTotal);
exports.default = router;
