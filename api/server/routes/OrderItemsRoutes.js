import { Router } from 'express'
import OrderItemsController from '../controllers/OrderItemsController'

const router = Router()
router.get('/', OrderItemsController.getAllOrderItems)
router.post('/', OrderItemsController.addOrderItems)
router.get('/:id', OrderItemsController.getOrderItems)
router.put('/:id', OrderItemsController.updatedOrderItems)
router.delete('/:id', OrderItemsController.deleteOrderItems)
export default router