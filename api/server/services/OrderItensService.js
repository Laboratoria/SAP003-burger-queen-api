import database from '../src/models';

class OrderItensService {
  static async getAllOrderItens() {
    try {
      return await database.OrderItens.findAll()
    } catch (error) {
      throw error
    }
  }

  static async addOrderItens(newOrderItens) {
    try {
      return await database.OrderItens.create(newOrderItens)
    } catch (error) {
      throw error
    }
  }

  static async updateOrderItens(id, updateOrderItens) {
    try {
      const orderitensToUpdate = await database.OrderItens.findOne({
        where: { id: Number(id) }
      })

      if (orderitensToUpdate) {
        await database.OrderItens.update(updateOrderItens, { where: { id: Number(id) } })
        return updateOrderItens;
      }
      return null;
    } catch (error) {
      throw error
    }
  }

  static async getOrderItens(id) {
    try {
      const theOrderItens = await database.OrderItens.findOne({
        where: { id: Number(id) }
      })

      return theOrderItens;
    } catch (error) {
      throw error
    }
  }

  static async deleteOrderItens(id) {
    try {
      const orderitensToDelete = await database.OrderItens.findOne({ where: { id: Number(id) } })

      if (orderitensToDelete) {
        const deletedOrderItens = await database.OrderItens.destroy({
          where: { id: Number(id) }
        })
        return deletedOrderItens;
      }
      return null
    } catch (error) {
      throw error
    }
  }
}

export default OrderItensService;