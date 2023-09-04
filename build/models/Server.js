"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const https_1 = require("https");
const http_1 = __importDefault(require("http"));
const fs_1 = __importDefault(require("fs"));
const cors_1 = __importDefault(require("cors"));
const providers_1 = __importDefault(require("../routes/providers"));
const orders_1 = __importDefault(require("../routes/orders"));
class Server {
    constructor() {
        this.app = (0, express_1.default)();
        this.port = parseInt(`${process.env.PORT}`);
        this.server = process.env.ENVIRONMENT == 'productivo'
            ? (0, https_1.createServer)({
                cert: fs_1.default.readFileSync('/cert/ssaver.gob.mx.crt'),
                key: fs_1.default.readFileSync('/cert/ssaver.gob.mx.key')
            }, this.app) : http_1.default.createServer(this.app);
    }
    middlewares() {
        this.app.use(express_1.default.json());
        this.app.use((0, cors_1.default)({ origin: '*' }));
        this.app.use('/api/providers', providers_1.default);
        this.app.use('/api/orders', orders_1.default);
    }
    execute() {
        this.middlewares();
        this.server.listen(this.port, () => {
            process.env.ENVIRONMENT == 'productivo'
                ? console.log(`Server Settings ready in https://facturas.ssaver.gob.mx:${this.port}`.america)
                : console.log(`Server Settings ready in http://localhost:${this.port}`.rainbow);
        });
    }
}
exports.default = Server;
