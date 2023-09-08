import { Response } from 'express';
import { PropsCreateOrderDetailQuery, PropsCreateOrderQuery, PropsGetOrderQuery, PropsGetTotalOrdersQuery, PropsUpdateOrderQuery } from '../interfaces/providers/ordersQueriesInterfaces';
import { getOrdersQuery, getInfOrdersQuery, getTotalOrdersQuery, createOrderQuery, updateOrderQuery, deleteOrderQuery, createOrderDetailQuery } from '../helpers/providers/ordersQueries';

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
        const id : number = parseInt( req.params.id );
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
        let queryTotalOrders = await getTotalOrdersQuery( { ...params } );
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

export const createOrderDetail = async (req : any, res: Response) => {
    try {
        const data : PropsCreateOrderDetailQuery = req.body;
        const { id_pedido } : PropsCreateOrderDetailQuery = req.body;
        const state = await createOrderDetailQuery( {...data} )

        state ?
            res.status( 200 ).json({
                ok: true,
                msg: 'Record Created',
            })
            :
            res.status( 404 ).json({
                ok: false,
                msg: `Order ${id_pedido} not found to create a detail`,
            })
    } catch (err) {
        console.log( err );
        res.status( 500 ).json({
            ok: false,
            msg: 'Server error contact the administrator'
        });
    }
}

export const updateOrder = async (req: any, res: Response) => {
    try {
        const id : number = parseInt( req.params.id );
        const data : PropsUpdateOrderQuery = req.body;
        const state = await updateOrderQuery({ ...data, order_id: id});

        Object.keys(data).length !== 0 ? (
            state ?
                res.status( 200 ).json({
                    ok: true,
                    msg: 'Record updated',
                }) 
                : 
                res.status( 404 ).json({
                    ok: false,
                    msg: 'Record to update not found'
                })
        )
        :
        res.status( 400 ).json({
            ok: false,
            msg: 'No data to update query'
        })

    } catch (err) {
        console.log( err );
        res.status( 500 ).json({
            ok: false,
            msg: 'Server error contact the administrator'
        });
    }
}

export const deleteOrder = async(req: any, res: Response) => {
    try {
        const id: number = parseInt( req.params.id );
        const state = await deleteOrderQuery(id);

        state ?
            res.status( 200 ).json({
                ok: true,
                msg: 'Record deleted',
            }) 
            : 
            res.status( 404 ).json({
                ok: false,
                msg: 'Record to delete not found'
            })

    } catch (err) {
        console.log( err );
        res.status( 500 ).json({
            ok: false,
            msg: 'Server error contact the administrator'
        });
    }
}