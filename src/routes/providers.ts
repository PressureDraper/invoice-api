/*
    Prefix: /providers
*/
import { Router } from 'express';
import { getProviders, getProvidersTotal } from '../controllers/providers';
const router : Router = Router();

router.get( '/', getProviders );

router.get( '/total', getProvidersTotal );
export default router;