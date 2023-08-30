import { db } from '../../utils/db';
import { PropsGetProviderQuery, PropsGetTotalProvierQuery } from '../../interfaces/providers/providerQueriesInterfaces';


export const getProvidersQuery = ( { page = '0', limit = '10', rfcFilter = '', nameFilter = '', clabeFilter = '' } : PropsGetProviderQuery ) => {
    return new Promise( async ( resolve, reject ) => {
        try {            
            console.log( page, limit );
            const rowsPerPage = parseInt( limit );
            const min = ( ( parseInt( page ) + 1 ) * rowsPerPage ) - rowsPerPage;

            let listProviders : any = await db.cat_proveedores.findMany({
                where: {
                    rfc: {
                        contains: rfcFilter
                    },
                    nombre: {
                        contains: nameFilter
                    },
                    clabe: {
                        contains: clabeFilter
                    }
                },
                select: {
                    id: true,
                    rfc: true,
                    nombre: true,
                    condpago: true,
                    clabe: true,
                    created_at: true
                },
                orderBy: {
                    created_at: 'desc'
                },
                skip: min,
                take: rowsPerPage,
                
            });
            resolve( listProviders );
        }
        catch( err ) {
            console.log( err );
            resolve( [] );
        }
    } );
}

export const getTotalProviers = ( { rfcFilter = '', nameFilter = '', clabeFilter = '' } : PropsGetTotalProvierQuery ) => {
    return new Promise( async ( resolve, reject ) => {
        try {
            let countListProviders = await db.cat_proveedores.count({
                where: {
                    rfc: {
                        contains: rfcFilter
                    },
                    nombre: {
                        contains: nameFilter
                    },
                    clabe: {
                        contains: clabeFilter
                    }
                },
            });
            resolve( countListProviders );
        }
        catch( err ) {
            console.log( err );
            resolve( 0 );
        }
    } )

}