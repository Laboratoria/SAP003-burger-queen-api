import TableService from '../services/TableService'
import Util from '../utils/Utils'

const util = new Util()

class TableController {
  static async getAllTables(req, res) {
    try {
      const allTables = await TableService.getAllTables()
      if (allTables.length > 0) {
        util.setSuccess(200, 'Tables retrieved', allTables)
      } else {
        util.setSuccess(200, 'No table found')
      }
      return util.send(res)
    } catch (error) {
      util.setError(400, error)
      return util.send(res)
    }
  }

  static async addTable(req, res) {
    if (!req.body.table_number || !req.body.OrderId) {
      util.setError(400, 'Please provide complete details')
      return util.send(res)
    }
    const newTable = req.body
    try {
      const createdTable = await TableService.addTable(newTable)
      util.setSuccess(201, 'Table Added!', createdTable)
      return util.send(res)
    } catch (error) {
      util.setError(400, error.message)
      return util.send(res)
    }
  }

  static async updatedTable(req, res) {
    const alteredTable = req.body
    const { table_number } = req.params
    
    if (!Number(table_number)) {
      util.setError(400, 'Please input a valid numeric value')
      return util.send(res)
    }
    try {
      const updateTable = await TableService.updateTable(table_number, alteredTable)
      
      if (!updateTable) {
        util.setError(404, `Cannot find table with the number: ${table_number}`)
      } else {
        util.setSuccess(200, 'Table updated', updateTable)
      }
      return util.send(res)
    } catch (error) {
      util.setError(404, error)
      return util.send(res)
    }
  }

  static async getTable(req, res) {
    const { table_number } = req.params

    if (!Number(table_number)) {
      util.setError(400, 'Please input a valid numeric value')
      return util.send(res)
    }

    try {
      const theTable = await TableService.getTable(table_number)

      if (theTable.length == 0) {
        util.setError(404, `Cannot find table with the number ${table_number}`)
      } else {
        util.setSuccess(200, 'Found Table and',theTable)
      }
      return util.send(res)
    } catch (error) {
      util.setError(404, error)
      return util.send(res)
    }
  }

  static async deleteTable(req, res) {
    const { table_number } = req.params

    if (!Number(table_number)) {
      util.setError(400, 'Please provide a numeric value')
      return util.send(res)
    }

    try {
      const tableToDelete = await TableService.deleteTable(table_number)

      if (tableToDelete) {
        util.setSuccess(200, 'Table deleted')
      } else {
        util.setError(404, `Table with the number ${table_number} cannot be found`)
      }
      return util.send(res)
    } catch (error) {
      util.setError(400, error)
      return util.send(res)
    }
  }
}

export default TableController