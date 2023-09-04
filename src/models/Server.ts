import colors from 'colors';
import express, { Express } from 'express';
import { createServer } from 'https';
import http from 'http';
import fs from 'fs';
import cors from 'cors';
import routerProviders from '../routes/providers';
import routerOrders from '../routes/orders';

class Server {
    private app: Express;
    private server: any;
    public port: number;

    constructor() {
        this.app = express();
        this.port = parseInt( `${ process.env.PORT }` );
        this.server = process.env.ENVIRONMENT == 'productivo'
            ? createServer({
                cert: fs.readFileSync('/cert/ssaver.gob.mx.crt'),
                key: fs.readFileSync('/cert/ssaver.gob.mx.key')
            }, this.app) : http.createServer( this.app );
    }

    middlewares() {
        this.app.use( express.json() );
        this.app.use( cors( { origin: '*' } ) );
        this.app.use( '/api/providers', routerProviders );
        this.app.use( '/api/orders', routerOrders );
    }

    execute() {
        this.middlewares();
        this.server.listen( this.port, () => {
            process.env.ENVIRONMENT == 'productivo'
                ? console.log( `Server Settings ready in https://facturas.ssaver.gob.mx:${ this.port }`.america )
                : console.log( `Server Settings ready in http://localhost:${ this.port }`.rainbow );
        } );
    }
}

export default Server;