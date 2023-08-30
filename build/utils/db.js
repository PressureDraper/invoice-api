"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = void 0;
const client_1 = require("@prisma/client");
let db;
//! Check if we are running un production mode
if (process.env.NODE_ENV == 'production') {
    exports.db = db = new client_1.PrismaClient();
}
else {
    //! Check if the is alredy a connection to the database
    if (!global.db) {
        global.db = new client_1.PrismaClient();
    }
    exports.db = db = global.db;
}
