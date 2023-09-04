import { Response } from 'express';
import { db } from '../utils/db';
import { PropsCreateOrderQuery, PropsGetOrderQuery, PropsGetTotalOrdersQuery } from '../interfaces/providers/ordersQueriesInterfaces';
import { getOrdersQuery, getInfOrdersQuery, getTotalOrdersQuery, createOrderQuery } from '../helpers/providers/ordersQueries';

export const getOrders = async (req: any, res: Response) => {
    try {
        const params : PropsGetOrderQuery = req.query;
        let queryOrders = await getOrdersQuery( { ...params } )
        res.status( 200 ).json({
            ok: true,
            msg: 'Ok',
            data: queryOrders   
        });
    } catch ( err ) {
        console.log( err );
        res.status( 500 ).json({
            ok: false,
            msg: 'Server error contact the administrator'
        });
    }
}

export const getInfOrders = async (req: any, res: Response) => {
    try {
        const id : number = req.params.id;
        const order = await getInfOrdersQuery( id );
        res.status( 200 ).json({
            ok: true,
            msg: 'ok',
            data: order
        })
    } catch (err) {
        console.log( err );
        res.status( 500 ).json({
            ok: false,
            msg: 'Server error contact the administrator'
        });
    }
}

export const getTotalOrders = async (req : any, res : Response) => {
    try {
        const params : PropsGetTotalOrdersQuery = req.query;
        let queryTotalOrders = await getTotalOrdersQuery( {...params} );
        res.status( 200 ).json({
            ok: true,
            msg: 'ok',
            data: queryTotalOrders
        })
    } catch (err) {
        console.log( err );
        res.status( 500 ).json({
            ok: false,
            msg: 'Server error contact the administrator'
        });
    }
}

export const createOrder = async (req : any, res : Response) => {
    try {
        const data : PropsCreateOrderQuery = req.body;
        await createOrderQuery( { ...data } );
        res.status( 200 ).json({
            ok: true,
            msg: 'Record Created',
        });
    } catch (err) {
        console.log( err );
        res.status( 500 ).json({
            ok: false,
            msg: 'Server error contact the administrator'
        });
    }
}

