import database from '../src/models'

class MenuService {
  static async getAllMenus() {
    try {
      return await database.Menu.findAll()
    } catch (error) {
      throw error
    }
  }

  static async addMenu(newMenu) {
    try {
      return await database.Menu.create(newMenu)
    } catch (error) {
      throw error
    }
  }

  static async updateMenu(id, updateMenu) {
    try {
      const menuToUpdate = await database.Menu.findOne({
        where: { id: Number(id) }
      })

      if (MenuToUpdate) {
        await database.Menu.update(updateMenu, { where: { id: Number(id) } })

        return updateMenu
      }
      return null
    } catch (error) {
      throw error
    }
  }

  static async getMenu(id) {
    try {
      const theMenu = await database.Menu.findOne({
        where: { id: Number(id) }
      })

      return theMenu
    } catch (error) {
      throw error
    }
  }

  static async deleteMenu(id) {
    try {
      const menuToDelete = await database.Menu.findOne({ where: { id: Number(id) } })

      if (menuToDelete) {
        const deletedMenu = await database.Menu.destroy({
          where: { id: Number(id) }
        })
        return deletedMenu
      }
      return null
    } catch (error) {
      throw error
    }
  }
}

export default MenuService