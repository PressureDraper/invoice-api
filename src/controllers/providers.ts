import { Response } from 'express';
import { createProviderQuery, deleteProviderQuery, getProvidersQuery, getTotalProviers, updateProviderQuery } from '../helpers/providers/providersQueries';
import { PropsCreateProviderQuery, PropsGetProviderQuery, PropsGetTotalProvierQuery } from '../interfaces/providers/providerQueriesInterfaces';

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

export const updateProvider = async ( req: any, res: Response ) => {
    try {
        const id : number = parseInt( req.params.id );
        const { clabe } = req.body;
        await updateProviderQuery( { id_provider: id, clabe } )
        res.status( 200 ).json({
            ok: true,
            msg: 'Record Updated',
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

export const createProvider = async ( req: any, res: Response ) => {
    try {
        const data : PropsCreateProviderQuery = req.body;
        await createProviderQuery( { ...data } );
        res.status( 200 ).json({
            ok: true,
            msg: 'Record Created',
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

export const deleteProvider = async ( req: any, res: Response ) => {
    try {
        const id : number = parseInt( req.params.id );
        await deleteProviderQuery( id );
        res.status( 200 ).json({
            ok: true,
            msg: 'Record Deleted',
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