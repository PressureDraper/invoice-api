import { Response } from 'express';
import { getProvidersQuery, getTotalProviers } from '../helpers/providers/providersQueries';
import { PropsGetProviderQuery, PropsGetTotalProvierQuery } from '../interfaces/providers/providerQueriesInterfaces';

export const getProviders = async ( req: any, res: Response ) => {
    try {
        const params : PropsGetProviderQuery = req.query;
        let queryProviders = await getProvidersQuery( { ...params } );
        res.status( 200 ).json({
            ok: true,
            msg: 'Ok',
            data: queryProviders
        });
    }
    catch( err ) {
        console.log( err );
        res.status( 500 ).json({
            ok: false,
            msg: 'Server error contact with the administrator'
        });        
    }
}

export const getProvidersTotal = async ( req: any, res: Response ) => {
    try {
        const params : PropsGetTotalProvierQuery = req.query;
        let queryTotalProviders = await getTotalProviers( { ...params } );
        res.status( 200 ).json({
            ok: true,
            msg: 'Ok',
            data: queryTotalProviders
        });
    }
    catch( err ) {
        console.log( err );
        res.status( 500 ).json({
            ok: false,
            msg: 'Server error contact with the administrator'
        }); 
    }
}