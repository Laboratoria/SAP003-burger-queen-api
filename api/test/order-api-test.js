import chai from 'chai'
import chatHttp from 'chai-http'
import 'chai/register-should'
import app from '../index'
chai.use(chatHttp)
const { expect } = chai

describe('Testing the order endpoints:', () => {
  it('It should create a order', (done) => {
    const order = {
      client_name: 'First Awesome order',
      table_number: 5,
      status: 'Em preparo',
    }
    chai.request(app)
      .post('/api/orders')
      .set('Accept', 'application/json')
      .send(order)
      .end((err, res) => {
        expect(res.status).to.equal(201)
        expect(res.body.data).to.include({
          id: 1,
          client_name: order.client_name,
          table_number: order.table_number,
          status: order.status
        })
        done()
      })
  })

  it('It should not create a order with incomplete parameters', (done) => {
    const order = {
      status: "Concluído"
    }
    chai.request(app)
      .post('/api/orders')
      .set('Accept', 'application/json')
      .send(order)
      .end((err, res) => {
        expect(res.status).to.equal(400)
        done()
      })
  })

  it('It should get all orders', (done) => {
    chai.request(app)
      .get('/api/orders')
      .set('Accept', 'application/json')
      .end((err, res) => {
        expect(res.status).to.equal(200)
        res.body.data[0].should.have.property('id')
        res.body.data[0].should.have.property('client_name')
        res.body.data[0].should.have.property('table_number')
        res.body.data[0].should.have.property('status')
        done()
      })
  })

  it('It should get a particular order', (done) => {
    const orderId = 1
    chai.request(app)
      .get(`/api/orders/${orderId}`)
      .set('Accept', 'application/json')
      .end((err, res) => {
        expect(res.status).to.equal(200)
        res.body.data.should.have.property('id')
        res.body.data.should.have.property('client_name')
        res.body.data.should.have.property('table_number')
        res.body.data.should.have.property('status')
        done()
      })
  })

  it('It should not get a particular order with invalid id', (done) => {
    const orderId = 8888
    chai.request(app)
      .get(`/api/orders/${orderId}`)
      .set('Accept', 'application/json')
      .end((err, res) => {
        expect(res.status).to.equal(404)
        res.body.should.have.property('message')
          .eql(`Cannot find Order with the id ${orderId}`)
        done()
      })
  })

  it('It should not get a particular order with non-numeric id', (done) => {
    const orderId = 'aaa'
    chai.request(app)
      .get(`/api/orders/${orderId}`)
      .set('Accept', 'application/json')
      .end((err, res) => {
        expect(res.status).to.equal(400)
        res.body.should.have.property('message')
          .eql('Please input a valid numeric value')
        done()
      })
  })

  it('It should update a order', (done) => {
    const orderId = 1
    const updatedOrder = {
      id: orderId,
      client_name: 'Updated Awesome order',
      table_number: 4,
      status: "Entregue"
    }
    chai.request(app)
      .put(`/api/orders/${orderId}`)
      .set('Accept', 'application/json')
      .send(updatedOrder)
      .end((err, res) => {
        expect(res.status).to.equal(200)
        expect(res.body.data.id).equal(updatedOrder.id)
        expect(res.body.data.client_name).equal(updatedOrder.client_name)
        expect(res.body.data.table_number).equal(updatedOrder.table_number)
        expect(res.body.data.status).equal(updatedOrder.status)
        done()
      })
  })

  it('It should not update a order with invalid id', (done) => {
    const orderId = '9999'
    const updatedOrder = {
      id: orderId,
      client_name: 'Updated Awesome order',
      table_number: 6,
      status: "OK"
    }
    chai.request(app)
      .put(`/api/orders/${orderId}`)
      .set('Accept', 'application/json')
      .send(updatedOrder)
      .end((err, res) => {
        expect(res.status).to.equal(404)
        res.body.should.have.property('message')
          .eql(`Cannot find Order with the id: ${orderId}`)
        done()
      })
  })

  it('It should not update a order with non-numeric id value', (done) => {
    const orderId = 'ggg'
    const updatedOrder = {
      id: orderId,
      client_name: 'Updated Awesome order',
      table_number: 6,
      status: "OK"
    }
    chai.request(app)
      .put(`/api/orders/${orderId}`)
      .set('Accept', 'application/json')
      .send(updatedOrder)
      .end((err, res) => {
        expect(res.status).to.equal(400)
        res.body.should.have.property('message')
          .eql('Please input a valid numeric value')
        done()
      })
  })


  it('It should delete a order', (done) => {
    const orderId = 1
    chai.request(app)
      .delete(`/api/orders/${orderId}`)
      .set('Accept', 'application/json')
      .end((err, res) => {
        expect(res.status).to.equal(200)
        expect(res.body.data).to.include({})
        done()
      })
  })

  it('It should not delete a order with invalid id', (done) => {
    const orderId = 777
    chai.request(app)
      .delete(`/api/orders/${orderId}`)
      .set('Accept', 'application/json')
      .end((err, res) => {
        expect(res.status).to.equal(404)
        res.body.should.have.property('message')
          .eql(`Order with the id ${orderId} cannot be found`)
        done()
      })
  })

  it('It should not delete a order with non-numeric id', (done) => {
    const orderId = 'bbb'
    chai.request(app)
      .delete(`/api/orders/${orderId}`)
      .set('Accept', 'application/json')
      .end((err, res) => {
        expect(res.status).to.equal(400)
        res.body.should.have.property('message').eql('Please provide a numeric value')
        done()
      })
  })
})