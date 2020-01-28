import database from '../src/models'

class ProductService {
  static async getAllProducts() {
    try {
      return await database.Product.findAll()
    } catch (error) {
      throw error
    }
  }

  static async addProduct(newProduct) {
    try {
      return await database.Product.create(newProduct)
    } catch (error) {
      throw error
    }
  }

  static async updateProduct(id, updateProduct) {
    try {
      const productToUpdate = await database.Product.findOne({
        where: { id: Number(id) }
      })

      if (productToUpdate) {
        await database.Product.update(updateProduct, { where: { id: Number(id) } })

        return updateProduct
      }
      return null
    } catch (error) {
      throw error
    }
  }

  static async getProduct(id) {
    try {
      const theProduct = await database.Product.findOne({
        where: { id: Number(id) }
      })

      return theProduct
    } catch (error) {
      throw error
    }
  }

  static async deleteProduct(id) {
    try {
      const productToDelete = await database.Product.findOne({ where: { id: Number(id) } })

      if (productToDelete) {
        const deletedProduct = await database.Product.destroy({
          where: { id: Number(id) }
        })
        return deletedProduct
      }
      return null
    } catch (error) {
      throw error
    }
  }
}

export default ProductService