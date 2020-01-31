import database from '../src/models'

class Tableservice {
  static async getAllTables() {
    try {
      return await database.Tables.findAll()
    } catch (error) {
      throw error
    }
  }

  static async addTable(newTable) {
    try {
      return await database.Tables.create(newTable)
    } catch (error) {
      throw error
    }
  }

  static async updateTable(tableNumber, updateTable) {
    try {
      const tableToUpdate = await database.Tables.findAll({
        where: { table_number: Number(tableNumber) }
      })
      
      if (tableToUpdate.length > 0) {
        await database.Tables.update(updateTable, { where: { table_number: Number(tableNumber) } })        
        return updateTable
      }
      return null
    } catch (error) {
      throw error
    }
  }

  static async getTable(tableNumber) {
    try {
      const theTable = await database.Tables.findAll({
        where: { table_number: Number(tableNumber) }
      })
      return theTable
    } catch (error) {
      throw error
    }
  }

  static async deleteTable(tableNumber) {
    try {
      const tableToDelete = await database.Tables.findAll({ where: { table_number: Number(tableNumber) } })

      if (tableToDelete) {
        const deletedTable = await database.Tables.destroy({
          where: { table_number: Number(tableNumber) }
        })
        return deletedTable
      }
      return null
    } catch (error) {
      throw error
    }
  }
}

export default Tableservice