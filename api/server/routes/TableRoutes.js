import { Router } from 'express';
import TableController from '../controllers/TableController';

const router = Router()
router.get('/', TableController.getAllTable)
router.post('/', TableController.addTable)
router.get('/:id', TableController.getTable)
router.put('/:id', TableController.updatedTable)
router.delete('/:id', TableController.deleteTable)

export default router;