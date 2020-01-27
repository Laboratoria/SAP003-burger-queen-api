import { Router } from 'express'
import TableController from '../controllers/Tablecontroller'

const router = Router()
router.get('/', TableController.getAllTables)
router.post('/', TableController.addTable)
router.get('/:id', TableController.getTable)
router.put('/:id', TableController.updatedTable)
router.delete('/:id', TableController.deleteTable)
export default router