import { db } from '../../utils/db';
import { PropsGetOrderQuery, PropsGetTotalOrders } from '../../interfaces/providers/ordersQueriesInterfaces';

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
                orderBy: {
                    id: 'desc'
                },
                skip: min,
                take: rowsPerPage
            });

            listOrders ? (
                listOrders.forEach((elm : any) => {
                    elm['id'] = parseInt(elm['id'].toString());
                    elm['id_grupo'] = parseInt(elm['id_grupo'].toString());
                })
            ) : null

            resolve( listOrders );
        } catch ( err ) {
            reject( err );
        }
    });
}

export const getInfOrdersQuery = ( id : number) => {
    return new Promise ( async (resolve, reject) => {
        try {
            const order : any = await db.rfn_pedidos.findUnique({
                where: {
                    id 
                }
            });

            order ? (
                order['id'] = parseInt(order['id'].toString()), 
                order['id_grupo'] = parseInt(order['id_grupo'].toString())
            ) : null

            resolve(order);
        } catch (err) {
            reject(err);
        }
    })
}

export const getTotalOrdersQuery = ({groupFilter, typeFilter = '', numberFilter = ''} : PropsGetTotalOrders) => {
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