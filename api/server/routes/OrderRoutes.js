import { Router } from 'express'
import OrdersController from '../controllers/Orderscontroler'

const router = Router()
router.get('/', OrdersController.getAllOrders)
router.post('/', OrdersController.addOrders)
router.get('/:id', OrdersController.getOrders)
router.put('/:id', OrdersController.updatedOrders)
router.delete('/:id', OrdersController.deleteOrders)
export default router