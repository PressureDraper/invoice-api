import { db } from '../../utils/db';
import { PropsCreateOrderQuery, PropsGetOrderQuery, PropsGetTotalOrdersQuery, PropsUpdateOrderQuery } from '../../interfaces/providers/ordersQueriesInterfaces';

export const getOrdersQuery = ({ page = '0', limit = '10', groupFilter , typeFilter = '', numberFilter = '' } : PropsGetOrderQuery ) => {
    return new Promise (async ( resolve, reject ) => {
        try {
            const rowsPerPage = parseInt( limit );
            const min = ((parseInt(page) + 1) * rowsPerPage) - rowsPerPage;
    
            let listOrders : any = await db.rfn_pedidos.findMany({
                where : {
                    id_grupo: groupFilter ? groupFilter : {},
                    tipo: typeFilter ? { contains : typeFilter } : {},
                    numero: numberFilter ? { contains : numberFilter } : {}
                },
                include: {
                    rfn_pedidos_detalles: true
                },
                orderBy: {
                    id: 'desc'
                },
                skip: min,
                take: rowsPerPage
            });

            listOrders ? (
                
                listOrders.forEach((elm : any) => {
                    elm.rfn_pedidos_detalles.length !== 0 && elm.rfn_pedidos_detalles.forEach((detail : any) => {
                        detail['id'] = parseInt(detail['id'].toString())
                        detail['id_clave'] = parseInt(detail['id_clave'].toString())
                        detail['id_pedido'] = parseInt(detail['id_pedido'].toString())
                    });
                    elm['id'] = parseInt(elm['id'].toString())
                    elm['id_grupo'] = parseInt(elm['id_grupo'].toString())
                })

            ) : null

            resolve( listOrders );
        } catch ( err ) {
            reject( err );
        }
    });
}

export const getInfOrdersQuery = ( id : number ) => {
    return new Promise ( async (resolve, reject) => {
        try {
            const order : any = await db.rfn_pedidos.findUnique({
                where: {
                    id 
                },
                include: {
                    rfn_pedidos_detalles: true
                }
            });

            order ? (

                order.rfn_pedidos_detalles.length !== 0 && (
                    order.rfn_pedidos_detalles[0]['id'] = parseInt(order.rfn_pedidos_detalles[0]['id'].toString()),
                    order.rfn_pedidos_detalles[0]['id_clave'] = parseInt(order.rfn_pedidos_detalles[0]['id_clave'].toString()),
                    order.rfn_pedidos_detalles[0]['id_pedido'] = parseInt(order.rfn_pedidos_detalles[0]['id_pedido'].toString())
                ),
                order['id'] = parseInt(order['id'].toString()), 
                order['id_grupo'] = parseInt(order['id_grupo'].toString())

            ) : null

            resolve(order);
        } catch (err) {
            reject(err);
        }
    })
}

export const getTotalOrdersQuery = ({groupFilter, typeFilter = '', numberFilter = ''} : PropsGetTotalOrdersQuery) => {
    return new Promise( async (resolve, reject) => {
        try {
            let countListOrders = await db.rfn_pedidos.count({
                where: {
                    id_grupo: groupFilter ? groupFilter : {},
                    tipo: typeFilter ? { contains : typeFilter } : {},
                    numero: numberFilter ? { contains : numberFilter } : {}
                }
            })

            countListOrders ? (

                resolve( countListOrders )

            ) : resolve( 0 );

        } catch (err) {
            reject(err);
        }
    });
}

export const createOrderQuery = ({numero = 'S/N', tipo, id_grupo} : PropsCreateOrderQuery) => {
    return new Promise( async (resolve, reject) => {
        try {
            await db.rfn_pedidos.create({
                data: {
                    numero,
                    tipo,
                    id_grupo
                }
            });
            resolve(true);
        } catch (err) {
            reject(false);
        }
    })
}

export const updateOrderQuery = ({numero, tipo, id_grupo, order_id } : PropsUpdateOrderQuery) => {
    return new Promise( async (resolve, reject) => {
        try {
            /* const [ numero ] = Object.keys(param); */
            const order = await db.rfn_pedidos.findUnique({
                where: {
                    id: order_id
                }
            });

            order ? (
                await db.rfn_pedidos.update({
                    where: {
                        id: order_id
                    },
                    data: {
                        numero,
                        tipo,
                        id_grupo
                    }
                }),

                resolve(true)

            ) : resolve(false);

        } catch (err) {
            reject(false);
        }
    })
}

export const deleteOrderQuery = (id: number) => {
    return new Promise ( async (resolve, reject) => {
        try {
            const order = await db.rfn_pedidos.findUnique({
                where: {
                    id: id
                }
            });

            order ? (
                await db.rfn_pedidos.update({
                    where: {
                        id
                    },
                    data: {
                        deleted_at: new Date().toISOString()
                    }
                }),

                resolve(true)

            ) : resolve(false);

        } catch (err) {
            reject(err);
        }
    })
}