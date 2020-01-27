import MenuService from '../services/MenuService'
import Util from '../utils/Utils'

const util = new Util()

class MenuController {
  static async getAllMenus(req, res) {
    try {
      const allMenus = await MenuService.getAllMenus()
      if (allMenus.length > 0) {
        util.setSuccess(200, 'Menus retrieved', allMenus)
      } else {
        util.setSuccess(200, 'No Menu found')
      }
      return util.send(res)
    } catch (error) {
      util.setError(400, error)
      return util.send(res)
    }
  }

  static async addMenu(req, res) {
    console.log(req.body.name, req.body.value, req.body.category, req.body.drink)
    if (!req.body.name || !req.body.value || !req.body.category || !req.body.drink) {
      util.setError(400, 'Please provide complete details')
      return util.send(res)
    }
    const newMenu = req.body
    try {
      const createdMenu = await MenuService.addMenu(newMenu)
      util.setSuccess(201, 'Menu Added!', createdMenu)
      return util.send(res)
    } catch (error) {
      util.setError(400, error.message)
      return util.send(res)
    }
  }

  static async updatedMenu(req, res) {
    const alteredMenu = req.body
    const { id } = req.params
    if (!Number(id)) {
      util.setError(400, 'Please input a valid numeric value')
      return util.send(res)
    }
    try {
      const updateMenu = await MenuService.updateMenu(id, alteredMenu)
      if (!updateMenu) {
        util.setError(404, `Cannot find Menu with the id: ${id}`)
      } else {
        util.setSuccess(200, 'Menu updated', updateMenu)
      }
      return util.send(res)
    } catch (error) {
      util.setError(404, error)
      return util.send(res)
    }
  }

  static async getMenu(req, res) {
    const { id } = req.params

    if (!Number(id)) {
      util.setError(400, 'Please input a valid numeric value')
      return util.send(res)
    }

    try {
      const theMenu = await MenuService.getMenu(id)

      if (!theMenu) {
        util.setError(404, `Cannot find Menu with the id ${id}`)
      } else {
        util.setSuccess(200, 'Found Menu', theMenu)
      }
      return util.send(res)
    } catch (error) {
      util.setError(404, error)
      return util.send(res)
    }
  }

  static async deleteMenu(req, res) {
    const { id } = req.params

    if (!Number(id)) {
      util.setError(400, 'Please provide a numeric value')
      return util.send(res)
    }

    try {
      const MenuToDelete = await MenuService.deleteMenu(id)

      if (MenuToDelete) {
        util.setSuccess(200, 'Menu deleted')
      } else {
        util.setError(404, `Menu with the id ${id} cannot be found`)
      }
      return util.send(res)
    } catch (error) {
      util.setError(400, error)
      return util.send(res)
    }
  }
}

export default MenuController