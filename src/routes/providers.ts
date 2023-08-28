/*
    Prefix: /providers
*/
import { Router } from 'express';
import { getProviders } from '../controllers/providers';
const router : Router = Router();

router.get( '/', getProviders );

export default router;