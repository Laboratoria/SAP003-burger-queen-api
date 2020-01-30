import database from '../src/models';

class OrderService {
  static async getAllOrder() {
    try {
      return await database.Order.findAll()
    } catch (error) {
      throw error
    }
  }

  static async addOrder(newOrder) {
    try {
      return await database.Order.create(newOrder)
    } catch (error) {
      throw error
    }
  }

  static async updateOrder(id, updateOrder) {
    try {
      const orderToUpdate = await database.Order.findOne({
        where: { id: Number(id) }
      })

      if (orderToUpdate) {
        await database.Order.update(updateOrder, { where: { id: Number(id) } })
        return updateOrder;
      }
      return null;
    } catch (error) {
      throw error
    }
  }

  static async getOrder(id) {
    try {
      const theOrder = await database.Order.findOne({
        where: { id: Number(id) }
      })

      return theOrder;
    } catch (error) {
      throw error
    }
  }

  static async deleteOrder(id) {
    try {
      const orderToDelete = await database.Order.findOne({ where: { id: Number(id) } })

      if (orderToDelete) {
        const deletedOrder = await database.Order.destroy({
          where: { id: Number(id) }
        })
        return deletedOrder;
      }
      return null
    } catch (error) {
      throw error
    }
  }

  static async getOrderItens(id) {
    try {
      const theItens = await database.OrderItens.findAll({
        where: { OrderId: Number(id) }
      })
      return theItens;
    } catch (error) {
      throw error
    }
  }

  static async getAllOrdersItens() {
    try {
      return await database.OrderItens.findAll()
    } catch (error) {
      throw error
    }
  }

  static async getOrderItem(id) {
    try {
      const theOrderItem = await database.OrderItens.findOne({
        where: { id: Number(id) }
      })
      return theOrderItem;
    } catch (error) {
      throw error
    }
  }

  static async addOrderItens(newOrderItem) {
    try {
      return await database.OrderItens.create(newOrderItem)
    } catch (error) {
      throw error
    }
  }

  static async updateOrderItem(id, updateOrderItem) {
    try {
      const itemToUpdate = await database.OrderItens.findOne({
        where: { id: Number(id) }
      })
      if (itemToUpdate) {
        await database.OrderItens.update(updateOrderItem, { where: { id: Number(id) } })
        return updateOrderItem;
      }
      return null;
    } catch (error) {
      throw error
    }
  }

  static async deleteOrderItem(id) {
    try {
      const itemToDelete = await database.OrderItens.findOne({ where: { id: Number(id) } })
      if (itemToDelete) {
        const deletedOrderItem = await database.OrderItens.destroy({
          where: { id: Number(id) }
        })
        return deletedOrderItem;
      }
      return null
    } catch (error) {
      throw error
    }
  }
}

export default OrderService;