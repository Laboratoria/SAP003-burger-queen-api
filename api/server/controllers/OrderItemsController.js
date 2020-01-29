import OrderItemsService from '../services/OrderItemsService'
import Util from '../utils/Utils'

const util = new Util()

class OrderItemsController {
  static async getAllOrderItems(req, res) {
    try {
      const allOrderItems = await OrderItemsService.getAllOrderItems()
      if (allOrderItems.length > 0) {
        util.setSuccess(200, 'Items retrieved', allOrderItems)
      } else {
        util.setSuccess(200, 'No items found')
      }
      return util.send(res)
    } catch (error) {
      util.setError(400, error)
      return util.send(res)
    }
  }

  static async addOrderItems(req, res) {
    if (!req.body.productId || !req.body.orderId || !req.body.options || !req.body.qtd || !req.body.extraId) {
      util.setError(400, 'Please provide complete details')
      return util.send(res)
    }
    const newOrderItems = req.body
    try {
      const createdOrderItems = await OrderItemsService.addOrderItems(newOrderItems)
      util.setSuccess(201, 'Order Item Added!', createdOrderItems)
      return util.send(res)
    } catch (error) {
      util.setError(400, error.message)
      return util.send(res)
    }
  }

  static async updatedOrderItems(req, res) {
    const alteredOrderItems = req.body
    const { id } = req.params
    if (!Number(id)) {
      util.setError(400, 'Please input a valid numeric value')
      return util.send(res)
    }
    try {
      const updateOrderItems = await OrderItemsService.updateOrderItems(id, alteredOrderItems)
      if (!updateOrderItems) {
        util.setError(404, `Cannot find items with the id: ${id}`)
      } else {
        util.setSuccess(200, 'Order Items updated', updateOrderItems)
      }
      return util.send(res)
    } catch (error) {
      util.setError(404, error)
      return util.send(res)
    }
  }
 
  static async getOrderItems(req, res) {
    const { id } = req.params

    if (!Number(id)) {
      util.setError(400, 'Please input a valid numeric value')
      return util.send(res)
    }

    try {
      const theOrderItems = await OrderItemsService.getOrderItems(id)

      if (!theOrderItems) {
        util.setError(404, `Cannot find OrderItems with the id ${id}`)
      } else {
        util.setSuccess(200, 'Found OrderItems', theOrderItems)
      }
      return util.send(res)
    } catch (error) {
      util.setError(404, error)
      return util.send(res)
    }
  }

  static async deleteOrderItems(req, res) {
    const { id } = req.params

    if (!Number(id)) {
      util.setError(400, 'Please provide a numeric value')
      return util.send(res)
    }

    try {
      const orderItemsToDelete = await OrderItemsService.deleteOrderItemsItems(id)

      if (orderItemsToDelete) {
        util.setSuccess(200, 'OrderItems deleted')
      } else {
        util.setError(404, `OrderItems with the id ${id} cannot be found`)
      }
      return util.send(res)
    } catch (error) {
      util.setError(400, error)
      return util.send(res)
    }
  }
}

export default OrderItemsController