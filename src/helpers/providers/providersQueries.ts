import { db } from '../../utils/db';
import { PropsCreateProviderQuery, PropsGetProviderQuery, PropsGetTotalProvierQuery, PropsUpdateProviderQuery } from '../../interfaces/providers/providerQueriesInterfaces';


export const getProvidersQuery = ({ page = '0', limit = '10', rfcFilter = '', nameFilter = '', clabeFilter = '' }: PropsGetProviderQuery) => {
    return new Promise(async (resolve, reject) => {
        try {
            const rowsPerPage = parseInt(limit);
            const min = ((parseInt(page) + 1) * rowsPerPage) - rowsPerPage;

            let listProviders: any = await db.cat_proveedores.findMany({
                where: {
                    rfc: {
                        contains: rfcFilter
                    },
                    nombre: {
                        contains: nameFilter
                    },
                    clabe: {
                        contains: clabeFilter
                    },
                    estatus: 'Activo'
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
                    id: 'desc'
                },
                skip: min,
                take: rowsPerPage,

            });
            resolve(listProviders);
        }
        catch (err) {
            console.log(err);
            resolve([]);
        }
    });
}

export const getTotalProviers = ({ rfcFilter = '', nameFilter = '', clabeFilter = '' }: PropsGetTotalProvierQuery) => {
    return new Promise(async (resolve, reject) => {
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
                    },
                    estatus: 'Activo'
                },
            });
            resolve(countListProviders);
        }
        catch (err) {
            console.log(err);
            resolve(0);
        }
    })
}

export const updateProviderQuery = ({ clabe, id_provider }: PropsUpdateProviderQuery) => {
    return new Promise(async (resolve, reject) => {
        try {
            await db.cat_proveedores.update({
                where: {
                    id: id_provider
                },
                data: {
                    clabe,
                }
            });
            resolve(true);
        }
        catch (err) {
            console.log(err);
            reject(false);
        }
    });
}

export const createProviderQuery = (
    { nombre, rfc, domicilio = null, noexterior = null, nointerior = null,
        colonia = null, ciudad = null, estado = null, pais = null, cp = null,
        localidad = null, condpago = null, telefono = null, cuentad = null,
        cuentah = null, ivad = null, curp = null, clabe = null, ivah = null
    }: PropsCreateProviderQuery) => {
    return new Promise(async (resolve, reject) => {
        try {
            await db.cat_proveedores.create({
                data: {
                    rfc,
                    nombre,
                    domicilio,
                    noexterior,
                    nointerior,
                    colonia,
                    ciudad,
                    estado,
                    pais,
                    cp,
                    localidad,
                    condpago,
                    telefono,
                    cuentad,
                    cuentah,
                    ivad,
                    ivah,
                    estatus: 'Activo',
                    curp,
                    clabe,
                }
            });
            resolve(true);
        }
        catch (err) {
            console.log(err);
            reject(false);
        }
    })
}

export const deleteProviderQuery = ( id: number ) => {
    return new Promise( async ( resolve, reject ) => {
        try {
            await db.cat_proveedores.update( {
                where: {
                    id
                },
                data: {
                    estatus: 'Inactivo'
                }

            } );
        }
        catch( err ) {
            console.log( err );
            resolve( false );
        }
    } );
}