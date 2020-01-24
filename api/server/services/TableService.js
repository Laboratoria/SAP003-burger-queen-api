import database from '../src/models'

class TableService {
  static async getAllTables() {
    try {
      return await database.Table.findAll()
    } catch (error) {
      throw error
    }
  }

  static async addTable(newTable) {
    try {
      return await database.Table.create(newTable)
    } catch (error) {
      throw error
    }
  }

  static async updateTable(id, updateTable) {
    try {
      const TableToUpdate = await database.Table.findOne({
        where: { id: Number(id) }
      })

      if (TableToUpdate) {
        await database.Table.update(updateTable, { where: { id: Number(id) } })

        return updateTable
      }
      return null
    } catch (error) {
      throw error
    }
  }

  static async getTable(id) {
    try {
      const theTable = await database.Table.findOne({
        where: { id: Number(id) }
      })

      return theTable
    } catch (error) {
      throw error
    }
  }

  static async deleteTable(id) {
    try {
      const TableToDelete = await database.Table.findOne({ where: { id: Number(id) } })

      if (TableToDelete) {
        const deletedTable = await database.Table.destroy({
          where: { id: Number(id) }
        })
        return deletedTable
      }
      return null
    } catch (error) {
      throw error
    }
  }
}

export default TableService