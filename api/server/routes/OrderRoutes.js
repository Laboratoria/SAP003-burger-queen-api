import { Router } from 'express';
import OrderController from '../controllers/Ordercontroller';

const router = Router()
router.get('/', OrderController.getAllOrder);
router.get('/itens', OrderController.getAllOrdersItens);
router.get('/itens/:id', OrderController.getOrderItens);
router.get('/item/:id', OrderController.getOrderItem);
router.post('/', OrderController.addOrder);
router.post('/itens', OrderController.addOrderItens);
router.get('/:id', OrderController.getOrder);
router.put('/:id', OrderController.updatedOrder);
router.put('/itens/:id', OrderController.updateOrderItem);
router.delete('/:id', OrderController.deleteOrder);
router.delete('/itens/:id', OrderController.deleteOrderItem);

export default router;