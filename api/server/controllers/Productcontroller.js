import ProductService from '../services/ProductService';
import Util from '../utils/Utils';

const util = new Util();

class ProductController {
  static async getAllProduct(req, res) {
    try {
      const allProduct = await ProductService.getAllProduct()
      if (allProduct.length > 0) {
        util.setSuccess(200, 'Product retrieved', allProduct)
      } else {
        util.setSuccess(200, 'No Product found')
      }
      return util.send(res)
    } catch (error) {
      util.setError(400, error)
      return util.send(res)
    }
  }

  static async addProduct(req, res) {
    if (!req.body.name || !req.body.price || typeof req.body.isAlcoholic !== 'boolean') {
      util.setError(400, 'Please provide complete details')
      return util.send(res)
    }
    const newProduct = req.body
    try {
      const createdProduct = await ProductService.addProduct(newProduct)
      util.setSuccess(201, 'Product Added!', createdProduct)
      return util.send(res)
    } catch (error) {
      util.setError(400, error.message)
      return util.send(res)
    }
  }

  static async updatedProduct(req, res) {
    const alteredProduct = req.body
    const { id } = req.params
    if (!Number(id)) {
      util.setError(400, 'Please input a valid numeric value')
      return util.send(res)
    }
    try {
      const updateProduct = await ProductService.updateProduct(id, alteredProduct)
      if (!updateProduct) {
        util.setError(404, `Cannot find Product with the id: ${id}`)
      } else {
        util.setSuccess(200, 'Product updated', updateProduct)
      }
      return util.send(res)
    } catch (error) {
      util.setError(404, error)
      return util.send(res)
    }
  }

  static async getProduct(req, res) {
    const { id } = req.params

    if (!Number(id)) {
      util.setError(400, 'Please input a valid numeric value')
      return util.send(res)
    }

    try {
      const theProduct = await ProductService.getProduct(id)

      if (!theProduct) {
        util.setError(404, `Cannot find Product with the id ${id}`)
      } else {
        util.setSuccess(200, 'Found Product', theProduct)
      }
      return util.send(res)
    } catch (error) {
      util.setError(404, error)
      return util.send(res)
    }
  }

  static async deleteProduct(req, res) {
    const { id } = req.params

    if (!Number(id)) {
      util.setError(400, 'Please provide a numeric value')
      return util.send(res)
    }

    try {
      const productToDelete = await ProductService.deleteProduct(id)

      if (productToDelete) {
        util.setSuccess(200, 'Product deleted')
      } else {
        util.setError(404, `Product with the id ${id} cannot be found`)
      }
      return util.send(res)
    } catch (error) {
      util.setError(400, error)
      return util.send(res)
    }
  }
}

export default ProductController;


// import models from '../../server/src/models/index';

// const getAll = async (req, res) => {
//   models.product.findAll({raw: true})
//   console.log(product)

// };

// export default {
//   getAll
// }