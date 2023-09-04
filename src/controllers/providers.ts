import { Response } from 'express';
import { createProviderQuery, deleteProviderQuery, getInfoProviderQuery, getProvidersQuery, getTotalProviersQuery, updateProviderQuery } from '../helpers/providers/providersQueries';
import { PropsCreateProviderQuery, PropsGetProviderQuery, PropsGetTotalProvierQuery } from '../interfaces/providers/providerQueriesInterfaces';
import { db } from '../utils/db';

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
            msg: 'Server error contact the administrator'
        });
    }
}

export const getInfoProvider = async ( req: any, res: Response ) => {
    try {
        const id : number = parseInt( req.params.id );
        const provider = await getInfoProviderQuery( id );
        res.status( 200 ).json({
            ok: true,
            msg: 'Ok',
            data: provider
        });
    }
    catch( err ) {
        console.log( err );
        res.status( 500 ).json({
            ok: false,
            msg: 'Server error contact the administrator'
        });  
    }
}

export const getProvidersTotal = async ( req: any, res: Response ) => {
    try {
        const params : PropsGetTotalProvierQuery = req.query;
        let queryTotalProviders = await getTotalProviersQuery( { ...params } );
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
            msg: 'Server error contact the administrator'
        }); 
    }
}

export const updateProvider = async ( req: any, res: Response ) => {
    try {                
        const id : number = parseInt( req.params.id );
        const provider = await db.cat_proveedores.findUnique({ where: { id } });

        if( !provider ) {
            return res.status( 404 ).json({
                ok: false,
                msg: 'Record to update not found.'
            });            
        }

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
            msg: 'Server error contact the administrator'
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
            msg: 'Server error contact the administrator'
        });
    }
}

export const deleteProvider = async ( req: any, res: Response ) => {
    try {
        const id : number = parseInt( req.params.id );
        const provider = await db.cat_proveedores.findUnique({ where: { id } });

        if( !provider ) {
            return res.status( 404 ).json({
                ok: false,
                msg: 'Record to update not found.'
            });            
        }

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
            msg: 'Server error contact the administrator'
        });
    }
}