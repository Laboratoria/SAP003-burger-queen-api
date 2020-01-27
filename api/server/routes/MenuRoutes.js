import { Router } from 'express'
import MenuController from '../controllers/Menucontroller'

const router = Router()
router.get('/', MenuController.getAllMenus)
router.post('/', MenuController.addMenu)
router.get('/:id', MenuController.getMenu)
router.put('/:id', MenuController.updatedMenu)
router.delete('/:id', MenuController.deleteMenu)
export default router