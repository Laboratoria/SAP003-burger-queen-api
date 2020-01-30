import OrderService from '../services/OrderService';
import Util from '../utils/Utils';

const util = new Util();

class OrderController {
  static async getAllOrder(req, res) {
    try {
      const allOrder = await OrderService.getAllOrder()
      if (allOrder.length > 0) {
        util.setSuccess(200, 'Order retrieved', allOrder)
      } else {
        util.setSuccess(200, 'No Order found')
      }
      return util.send(res)
    } catch (error) {
      util.setError(400, error)
      return util.send(res)
    }
  }

  static async addOrder(req, res) {
    if (!req.body.TableId || !req.body.statusOrder) {
      util.setError(400, 'Please provide complete details')
      return util.send(res)
    }
    const newOrder = req.body;
    try {
      const createdOrder = await OrderService.addOrder(newOrder)
      util.setSuccess(201, 'Order Added!', createdOrder)
      return util.send(res)
    } catch (error) {
      util.setError(400, error.message)
      return util.send(res)
    }
  }

  static async updatedOrder(req, res) {
    const alteredOrder = req.body
    const { id } = req.params
    if (!Number(id)) {
      util.setError(400, 'Please input a valid numeric value')
      return util.send(res)
    }
    try {
      const updateOrder = await OrderService.updateOrder(id, alteredOrder)
      if (!updateOrder) {
        util.setError(404, `Cannot find order with the id: ${id}`)
      } else {
        util.setSuccess(200, 'Order updated', updateOrder)
      }
      return util.send(res)
    } catch (error) {
      util.setError(404, error)
      return util.send(res)
    }
  }

  static async getOrder(req, res) {
    const { id } = req.params;

    if (!Number(id)) {
      util.setError(400, 'Please input a valid numeric value')
      return util.send(res)
    }
    try {
      const theOrder = await OrderService.getOrder(id);

      if (!theOrder) {
        util.setError(404, `Cannot find Order with the id ${id}`)
      } else {
        util.setSuccess(200, 'Found Order', theOrder)
      }
      return util.send(res)
    } catch (error) {
      util.setError(404, error)
      return util.send(res)
    }
  }

  static async deleteOrder(req, res) {
    const { id } = req.params;

    if (!Number(id)) {
      util.setError(400, 'Please provide a numeric value')
      return util.send(res)
    }

    try {
      const orderToDelete = await OrderService.deleteOrder(id);

      if (orderToDelete) {
        util.setSuccess(200, 'Order deleted')
      } else {
        util.setError(404, `Order with the id ${id} cannot be found`)
      }
      return util.send(res)
    } catch (error) {
      util.setError(400, error)
      return util.send(res)
    }
  }

  static async getOrderItens(req, res) {
    const id = req.params.id;
    if (!Number(id)) {
      util.setError(400, 'Please input a valid numeric value');
      return util.send(res)
    }
    try {
      const theItens = await OrderService.getOrderItens(id);
      if (!theItens) {
        util.setError(404, `Cannot find Order itens with the id ${id}`)
      } else {
        util.setSuccess(200, 'Found Order itens', theItens)
      }
      return util.send(res)
    } catch (error) {
      util.setError(404, error)
      return util.send(res)
    }
  }

  static async getAllOrdersItens(req, res) {
    try {
      const allOrdersItens = await OrderService.getAllOrdersItens()
      if (allOrdersItens.length > 0) {
        util.setSuccess(200, 'Order itens retrieved', allOrdersItens)
      } else {
        util.setSuccess(200, 'No Order itens found')
      }
      return util.send(res)
    } catch (error) {
      util.setError(400, error)
      return util.send(res)
    }
  }

  static async getOrderItem(req, res) {
    const { id } = req.params;

    if (!Number(id)) {
      util.setError(400, 'Please input a valid numeric value')
      return util.send(res)
    }
    try {
      const theOrderItem = await OrderService.getOrderItem(id);

      if (!theOrderItem) {
        util.setError(404, `Cannot find Order item with the id ${id}`)
      } else {
        util.setSuccess(200, 'Found Order item', theOrderItem)
      }
      return util.send(res)
    } catch (error) {
      util.setError(404, error)
      return util.send(res)
    }
  }

  static async addOrderItens(req, res) {
    if (!req.body.ProductId || !req.body.OrderId || !req.body.statusItem) {
      util.setError(400, 'Please provide complete details')
      return util.send(res)
    }
    const newOrderItem = req.body;
    try {
      const createdOrderItem = await OrderService.addOrderItens(newOrderItem)
      util.setSuccess(201, 'Order item Added!', createdOrderItem)
      return util.send(res)
    } catch (error) {
      util.setError(400, error.message)
      return util.send(res)
    }
  }

  static async updateOrderItem(req, res) {
    const alteredOrderItem = req.body
    const { id } = req.params
    if (!Number(id)) {
      util.setError(400, 'Please input a valid numeric value')
      return util.send(res)
    }
    try {
      const updateOrderItem = await OrderService.updateOrderItem(id, alteredOrderItem)
      if (!updateOrderItem) {
        util.setError(404, `Cannot find order with the id: ${id}`)
      } else {
        util.setSuccess(200, 'Order item updated', updateOrderItem)
      }
      return util.send(res)
    } catch (error) {
      util.setError(404, error)
      return util.send(res)
    }
  }

  static async deleteOrderItem(req, res) {
    const { id } = req.params;

    if (!Number(id)) {
      util.setError(400, 'Please provide a numeric value')
      return util.send(res)
    }

    try {
      const orderItemToDelete = await OrderService.deleteOrderItem(id);

      if (orderItemToDelete) {
        util.setSuccess(200, 'Order item deleted')
      } else {
        util.setError(404, `Order item with the id ${id} cannot be found`)
      }
      return util.send(res)
    } catch (error) {
      util.setError(400, error)
      return util.send(res)
    }
  }
}

export default OrderController;