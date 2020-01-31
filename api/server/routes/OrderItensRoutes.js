import { Router } from 'express';
import OrderItensController from '../controllers/OrderItensController';

const router = Router()
router.get('/', OrderItensController.getAllOrderItens)
router.post('/', OrderItensController.addOrderItens)
router.get('/:id', OrderItensController.getOrderItens)
router.put('/:id', OrderItensController.updatedOrderItens)
router.delete('/:id', OrderItensController.deleteOrderItens)

export default router;