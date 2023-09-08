import { Router } from 'express';
import { check } from 'express-validator';
import { createOrder, createOrderDetail, deleteOrder, getInfOrders, getOrders, getTotalOrders, updateOrder } from '../controllers/orders';
import { validateFields } from '../middlewares/validate-fields';

const router : Router = Router();

router.get( '/', getOrders );
router.get( '/:id', getInfOrders );
router.get( '/total/count', getTotalOrders );

router.post( '/', [
    check('tipo', 'El campo tipo es obligatorio' ).not().isEmpty(),
    check('id_grupo', 'El campo id_grupo es obligatorio').not().isEmpty(),
    validateFields
], createOrder );

router.post( '/detail', [
    check('importe', 'El campo importe es obligatorio').not().isEmpty(),
    check('id_clave', 'El campo id_clave es obligatorio').not().isEmpty(),
    check('id_pedido', 'El campo id_pedido es obligatorio').not().isEmpty(),
    validateFields
], createOrderDetail)

router.put( '/:id', updateOrder);

router.delete( '/:id', deleteOrder );

export default router;