import database from '../src/models'

class OrderItemsService {
  static async getAllOrderItems() {
    try {
      return await database.OrderItems.findAll()
    } catch (error) {
      throw error
    }
  }

  static async addOrderItems(newOrderItems) {
    try {
      return await database.OrderItems.create(newOrderItems)
    } catch (error) {
      throw error
    }
  }

  static async updateOrderItems(id, updateOrderItems) {
    try {
      const orderItemsToUpdate = await database.OrderItems.findOne({
        where: { id: Number(id) }
      })

      if (orderItemsToUpdate) {
        await database.OrderItems.update(updateOrderItems, { where: { id: Number(id) } })

        return updateOrderItems
      }
      return null
    } catch (error) {
      throw error
    }
  }

  static async getOrderItems(id) {
    try {
      const theOrderItems = await database.OrderItems.findOne({
        where: { id: Number(id) }
      })

      return theOrderItems
    } catch (error) {
      throw error
    }
  }

  static async deleteOrderItems(id) {
    try {
      const orderItemsToDelete = await database.OrderItems.findOne({ where: { id: Number(id) } })

      if (orderItemsToDelete) {
        const deletedOrderItems = await database.OrderItems.destroy({
          where: { id: Number(id) }
        })
        return deletedOrderItems
      }
      return null
    } catch (error) {
      throw error
    }
  }
}

export default OrderItemsService