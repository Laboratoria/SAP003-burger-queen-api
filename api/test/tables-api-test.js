import chai from 'chai'
import chatHttp from 'chai-http'
import 'chai/register-should'
import app from '../index'
chai.use(chatHttp)
const { expect } = chai

const order = {
  id: 2,
  client_name: 'Jack',
  table_number: 1,
  status: 'Em preparo'
}

const table = {
  id: 1,
  table_number: 70,
  OrderId: 1
}

describe('Testing table endpoints:', () => {

  it('It should create a table', (done) => {
    chai.request(app)
      .post('/api/orders')
      .set('Accept', 'application/json')
      .send(order)
      .end(() => {
        chai.request(app)
          .post('/api/tables')
          .set('Accept', 'application/json')
          .send(table)
          .end((err, res) => {
            expect(res.status).to.equal(201)
            expect(res.body.data).to.include({
              id: 1,
              table_number: table.table_number,
              OrderId: table.OrderId
            })
            done()
          })
      })
  })

  it('It should not create a table with incomplete parameters', (done) => {
    const table = {
      table_number: 2,
    }
    chai.request(app)
      .post('/api/tables')
      .set('Accept', 'application/json')
      .send(table)
      .end((err, res) => {
        expect(res.status).to.equal(400)
        done()
      })
  })

  it('It should get all tables', (done) => {
    chai.request(app)
      .get('/api/tables')
      .set('Accept', 'application/json')
      .end((err, res) => {        
        expect(res.status).to.equal(200)
        res.body.data[0].should.have.property('id')
        res.body.data[0].should.have.property('table_number')
        res.body.data[0].should.have.property('OrderId')
        done()
      })
  })

  it('It should get a particular table', (done) => {
    const tableNumber = 70
    chai.request(app)
      .get(`/api/tables/${tableNumber}`)
      .set('Accept', 'application/json')
      .end((err, res) => {
        expect(res.status).to.equal(200)       
        res.body.data[0].should.have.property('id')
        res.body.data[0].should.have.property('table_number')
        res.body.data[0].should.have.property('OrderId')
        done()
      })
  })

  it('It should not get a particular table with invalid id', (done) => {
    const tableNumber = 777
    chai.request(app)
      .get(`/api/tables/${tableNumber}`)
      .set('Accept', 'application/json')
      .end((err, res) => {
        expect(res.status).to.equal(404)
        res.body.should.have.property('message')
          .eql(`Cannot find table with the number ${tableNumber}`)
        done()
      })
  })

    it('It should not get a particular table with non-numeric tableNumber', (done) => {
    const tableNumber = 'aaa'
    chai.request(app)
      .get(`/api/tables/${tableNumber}`)
      .set('Accept', 'application/json')
      .end((err, res) => {
        expect(res.status).to.equal(400)
        res.body.should.have.property('message')
          .eql('Please input a valid numeric value')
        done()
      })
  })

    it('It should update a table', (done) => {
    const tableNumber = 70
    const updatedTable = {
      id: 3,
      table_number: tableNumber,
      OderId: 1    
    }
    chai.request(app)
      .put(`/api/tables/${tableNumber}`)
      .set('Accept', 'application/json')
      .send(updatedTable)
      .end((err, res) => {
        expect(res.status).to.equal(200)
        expect(res.body.data.id).equal(updatedTable.id)
        expect(res.body.data.table_number).equal(updatedTable.table_number)
        expect(res.body.data.OrderId).equal(updatedTable.OrderId)
        done()
      })
  })


  it('It should not update a order item with invalid id', (done) => {
    const tableNumber = 9999
    const updatedTable = {
      id: 3,
      table_number: tableNumber,
      OderId: 1 
    }

    chai.request(app)
      .put(`/api/tables/${tableNumber}`)
      .set('Accept', 'application/json')
      .send(updatedTable)
      .end((err, res) => {
        expect(res.status).to.equal(404)
        res.body.should.have.property('message')
          .eql(`Cannot find table with the number: ${tableNumber}`)
        done()
      })
  })

  it('It should not update a table with non-numeric table_number value', (done) => {
    const tableNumber = 'ggg'
    const updatedTable = {
      id: 3,
      table_number: tableNumber,
      OderId: 1 
    }
    chai.request(app)
      .put(`/api/tables/${tableNumber}`)
      .set('Accept', 'application/json')
      .send(updatedTable)
      .end((err, res) => {
        expect(res.status).to.equal(400)
        res.body.should.have.property('message')
          .eql('Please input a valid numeric value')
        done()
      })
  })

  it('It should delete a table', (done) => {
    const tableNumber = 70
    chai.request(app)
      .delete(`/api/tables/${tableNumber}`)
      .set('Accept', 'application/json')
      .end((err, res) => {
        expect(res.status).to.equal(200)
        expect(res.body.data).to.include({})
        done()
      })
  })


    it('It should not delete a table with invalid id', (done) => {
    const tableNumber = 777
    chai.request(app)
      .delete(`/api/tables/${tableNumber}`)
      .set('Accept', 'application/json')
      .end((err, res) => {
        expect(res.status).to.equal(404)
        res.body.should.have.property('message')
          .eql(`Table with the number ${tableNumber} cannot be found`)
        done()
      })
  })

  it('It should not delete a table with non-numeric table_number', (done) => {
    const tableNumber = 'bbb'
    chai.request(app)
      .delete(`/api/tables/${tableNumber}`)
      .set('Accept', 'application/json')
      .end((err, res) => {
        expect(res.status).to.equal(400)
        res.body.should.have.property('message').eql('Please provide a numeric value')
        done()
      })
  })

})


