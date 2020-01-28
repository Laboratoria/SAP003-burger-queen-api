import OrderItensService from '../services/OrderItensService';
import Util from '../utils/Utils';

const util = new Util();

class OrderItensController {
  static async getAllOrderItens(req, res) {
    try {
      const allOrderItens = await OrderItensService.getAllOrderItens()
      if (allOrderItens.length > 0) {
        util.setSuccess(200, 'OrderItens retrieved', allOrderItens)
      } else {
        util.setSuccess(200, 'No OrderItens found')
      }
      return util.send(res)
    } catch (error) {
      util.setError(400, error)
      return util.send(res)
    }
  }

  static async addOrderItens(req, res) {
    if (!req.body.ProductId || !req.body.OrderId || !req.body.statusItem) {
      util.setError(400, 'Please provide complete details')
      return util.send(res)
    }
    const newOrderItens = req.body
    try {
      const createdOrderItens = await OrderItensService.addOrderItens(newOrderItens)
      util.setSuccess(201, 'OrderItens Added!', createdOrderItens)
      return util.send(res)
    } catch (error) {
      console.log('SOS MALIBU')
      util.setError(400, error.message)
      return util.send(res)
    }
  }

  static async updatedOrderItens(req, res) {
    const alteredOrderItens = req.body
    const { id } = req.params
    if (!Number(id)) {
      util.setError(400, 'Please input a valid numeric value')
      return util.send(res)
    }
    try {
      const updateOrderItens = await OrderItensService.updateOrderItens(id, alteredOrderItens)
      if (!updateOrderItens) {
        util.setError(404, `Cannot find OrderItens with the id: ${id}`)
      } else {
        util.setSuccess(200, 'OrderItens updated', updateOrderItens)
      }
      return util.send(res)
    } catch (error) {
      util.setError(404, error)
      return util.send(res)
    }
  }

  static async getOrderItens(req, res) {
    const { id } = req.params

    if (!Number(id)) {
      util.setError(400, 'Please input a valid numeric value')
      return util.send(res)
    }

    try {
      const theOrderItens = await OrderItensService.getOrderItens(id)

      if (!theOrderItens) {
        util.setError(404, `Cannot find OrderItens with the id ${id}`)
      } else {
        util.setSuccess(200, 'Found OrderItens', theOrderItens)
      }
      return util.send(res)
    } catch (error) {
      util.setError(404, error)
      return util.send(res)
    }
  }

  static async deleteOrderItens(req, res) {
    const { id } = req.params

    if (!Number(id)) {
      util.setError(400, 'Please provide a numeric value')
      return util.send(res)
    }

    try {
      const orderitensToDelete = await OrderItensService.deleteOrderItens(id)

      if (orderitensToDelete) {
        util.setSuccess(200, 'OrderItens deleted')
      } else {
        util.setError(404, `OrderItens with the id ${id} cannot be found`)
      }
      return util.send(res)
    } catch (error) {
      util.setError(400, error)
      return util.send(res)
    }
  }
}

export default OrderItensController;