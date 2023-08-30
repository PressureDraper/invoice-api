/*
    Prefix: /providers
*/
import { Router } from 'express';
import { check } from 'express-validator';
import { createProvider, deleteProvider, getProviders, getProvidersTotal, updateProvider } from '../controllers/providers';
import { validateFields } from '../middlewares/validate-fields';
const router : Router = Router();

router.get( '/', getProviders );
router.post( 
    '/',
    [
        check( 'rfc', 'El campo rfc es obligatorio' ).not().isEmpty(),
        check( 'nombre', 'El campo nombre es obligatorio' ).not().isEmpty(),        
        validateFields
    ],
    createProvider 
);
router.put( 
    '/:id',
    [      
        check( 'clabe', 'El campo clabe es obligatorio' ).not().isEmpty(),
        validateFields
    ],
    updateProvider 
);
router.delete( '/:id', deleteProvider );


router.get( '/total', getProvidersTotal );
export default router;