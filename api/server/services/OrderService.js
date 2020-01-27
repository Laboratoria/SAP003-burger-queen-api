import database from '../src/models'

class OrderService {
  static async getAllOrders() {
    try {
      return await database.Orders.findAll()
    } catch (error) {
      throw error
    }
  }

  static async addOrders(newOrders) {
    try {
      return await database.Orders.create(newOrders)
    } catch (error) {
      throw error
    }
  }

  static async updateOrders(id, updateOrders) {
    try {
      const OrdersToUpdate = await database.Orders.findOne({
        where: { id: Number(id) }
      })

      if (OrdersToUpdate) {
        await database.Orders.update(updateOrders, { where: { id: Number(id) } })

        return updateOrders
      }
      return null
    } catch (error) {
      throw error
    }
  }

  static async getOrders(id) {
    try {
      const theOrders = await database.Orders.findOne({
        where: { id: Number(id) }
      })

      return theOrders
    } catch (error) {
      throw error
    }
  }

  static async deleteOrders(id) {
    try {
      const OrdersToDelete = await database.Orders.findOne({ where: { id: Number(id) } })

      if (OrdersToDelete) {
        const deletedOrders = await database.Orders.destroy({
          where: { id: Number(id) }
        })
        return deletedOrders
      }
      return null
    } catch (error) {
      throw error
    }
  }
}

export default OrderService