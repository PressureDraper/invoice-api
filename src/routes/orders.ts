import { Router } from 'express';
import { check } from 'express-validator';
import { getInfOrders, getOrders } from '../controllers/orders';
import { validateFields } from '../middlewares/validate-fields';

const router : Router = Router();

router.get( '/', getOrders );
router.get( '/:id', getInfOrders);

export default router;