import { Router } from 'express'
import TableController from '../controllers/TableController'

const router = Router()
router.get('/', TableController.getAllTables)
router.post('/', TableController.addTable)
router.get('/:table_number', TableController.getTable)
router.put('/:table_number', TableController.updatedTable)
router.delete('/:table_number', TableController.deleteTable)
export default router