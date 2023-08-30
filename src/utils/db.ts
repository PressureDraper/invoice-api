import { PrismaClient } from '@prisma/client';

let db : PrismaClient;

//! Check if we are running un production mode
if( process.env.NODE_ENV == 'production' ) {
    db = new PrismaClient();
} else {
    //! Check if the is alredy a connection to the database
    if( !global.db ) {
        global.db = new PrismaClient();
    }

    db = global.db;
}

export { db };