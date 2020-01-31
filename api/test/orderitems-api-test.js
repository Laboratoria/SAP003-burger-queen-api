import chai from 'chai'
import chatHttp from 'chai-http'
import 'chai/register-should'
import app from '../index'
chai.use(chatHttp)
const { expect } = chai

const product = {
  id: 2,
  name: 'burguinho',
  price: 5,
  breakfast: false,
  product_type: 'primary'
}

const order = {
  id: 1,
  client_name: 'Jack',
  table_number: 1,
  status: 'Em preparo'
}

const orderItem = {
  id: 1,
  ProductId: 2,
  OrderId: 1,
  ExtrasId: 2,
  qdt: 2,
  options: 'Carne Bovina'
}

describe('Testing the order item endpoints:', () => {

  it('It should create a order item', (done) => {
    chai.request(app)
      .post('/api/products')
      .set('Accept', 'application/json')
      .send(product)
      .end((err, res) => {
        console.log("erro set product", res.body);
        chai.request(app)
          .post('/api/orders')
          .set('Accept', 'application/json')
          .send(order)
          .end((err, res) => {
            console.log("erro set order", res.body);
            chai.request(app)
              .post('/api/order-items')
              .set('Accept', 'application/json')
              .send(orderItem)
              .end((err, res) => {
                console.log("erro set order items", res.body);
                expect(res.status).to.equal(201)
                expect(res.body.data).to.include({
                  id: 1,
                  ProductId: orderItem.ProductId,
                  OrderId: orderItem.OrderId,
                  ExtrasId: orderItem.ExtrasId,
                  qdt: orderItem.qdt,
                  options: orderItem.options
                })
                done()
              })
          })
      })
  })

  it('It should not create a order item with incomplete parameters', (done) => {
    const orderItem = {
      ProductId: 2,
    }
    chai.request(app)
      .post('/api/order-items')
      .set('Accept', 'application/json')
      .send(orderItem)
      .end((err, res) => {
        expect(res.status).to.equal(400)
        done()
      })
  })

  it('It should get all orders items', (done) => {
    chai.request(app)
      .get('/api/order-items')
      .set('Accept', 'application/json')
      .end((err, res) => {        
        expect(res.status).to.equal(200)
        res.body.data[0].should.have.property('id')
        res.body.data[0].should.have.property('ProductId')
        res.body.data[0].should.have.property('OrderId')
        res.body.data[0].should.have.property('ExtrasId')
        res.body.data[0].should.have.property('qdt')
        res.body.data[0].should.have.property('options')
        done()
      })
  })

  it('It should get a particular order item', (done) => {
    const orderItemId = 1
    chai.request(app)
      .get(`/api/order-items/${orderItemId}`)
      .set('Accept', 'application/json')
      .end((err, res) => {
        expect(res.status).to.equal(200)
        res.body.data.should.have.property('id')
        res.body.data.should.have.property('ProductId')
        res.body.data.should.have.property('OrderId')
        res.body.data.should.have.property('ExtrasId')
        res.body.data.should.have.property('qdt')
        res.body.data.should.have.property('options')
        done()
      })
  })

  it('It should not get a particular order item with invalid id', (done) => {
    const orderItemId = 8888
    chai.request(app)
      .get(`/api/order-items/${orderItemId}`)
      .set('Accept', 'application/json')
      .end((err, res) => {
        expect(res.status).to.equal(404)
        res.body.should.have.property('message')
          .eql(`Cannot find OrderItems with the id ${orderItemId}`)
        done()
      })
  })

  it('It should not get a particular order item with non-numeric id', (done) => {
    const orderItemId = 'aaa'
    chai.request(app)
      .get(`/api/order-items/${orderItemId}`)
      .set('Accept', 'application/json')
      .end((err, res) => {
        expect(res.status).to.equal(400)
        res.body.should.have.property('message')
          .eql('Please input a valid numeric value')
        done()
      })
  })

  it('It should update a order item', (done) => {
    const orderItemId = 1
    const updatedOrderItem = {
      id: orderItemId,
      ProductId: 2,
      OrderId: 1,
      ExtrasId: 2,
      qdt: 7,
      options: 'Vegetariano'
    }
    chai.request(app)
      .put(`/api/order-items/${orderItemId}`)
      .set('Accept', 'application/json')
      .send(updatedOrderItem)
      .end((err, res) => {
        expect(res.status).to.equal(200)
        expect(res.body.data.id).equal(updatedOrderItem.id)
        expect(res.body.data.ProductId).equal(updatedOrderItem.ProductId)
        expect(res.body.data.OrderId).equal(updatedOrderItem.OrderId)
        expect(res.body.data.ExtrasId).equal(updatedOrderItem.ExtrasId)
        expect(res.body.data.qdt).equal(updatedOrderItem.qdt)
        expect(res.body.data.options).equal(updatedOrderItem.options)
        done()
      })
  })

  it('It should not update a order item with invalid id', (done) => {
    const orderItemId = 9999
    const updatedOrderItem = {
      id: orderItemId,
      ProductId: 2,
      OrderId: 1,
      ExtrasId: 2,
      qdt: 7,
      options: 'Vegetariano'
    }

    chai.request(app)
      .put(`/api/order-items/${orderItemId}`)
      .set('Accept', 'application/json')
      .send(updatedOrderItem)
      .end((err, res) => {
        expect(res.status).to.equal(404)
        res.body.should.have.property('message')
          .eql(`Cannot find items with the id: ${orderItemId}`)
        done()
      })
  })

    it('It should not update a order item with non-numeric id value', (done) => {
    const orderItemId = 'ggg'
    const updatedOrderItem = {
      id: orderItemId,
      ProductId: 2,
      OrderId: 1,
      ExtrasId: 2,
      qdt: 7,
      options: 'Vegetariano'
    }
    chai.request(app)
      .put(`/api/order-items/${orderItemId}`)
      .set('Accept', 'application/json')
      .send(updatedOrderItem)
      .end((err, res) => {
        expect(res.status).to.equal(400)
        res.body.should.have.property('message')
          .eql('Please input a valid numeric value')
        done()
      })
  })

    it('It should delete a order item', (done) => {
    const orderItemId = 1
    chai.request(app)
      .delete(`/api/order-items/${orderItemId}`)
      .set('Accept', 'application/json')
      .end((err, res) => {
        expect(res.status).to.equal(200)
        expect(res.body.data).to.include({})
        done()
      })
  })

    it('It should not delete a order item with invalid id', (done) => {
    const orderItemId = 777
    chai.request(app)
      .delete(`/api/order-items/${orderItemId}`)
      .set('Accept', 'application/json')
      .end((err, res) => {
        expect(res.status).to.equal(404)
        res.body.should.have.property('message')
          .eql(`OrderItems with the id ${orderItemId} cannot be found`)
        done()
      })
  })

    it('It should not delete a order item with non-numeric id', (done) => {
    const orderItemId = 'bbb'
    chai.request(app)
      .delete(`/api/order-items/${orderItemId}`)
      .set('Accept', 'application/json')
      .end((err, res) => {
        expect(res.status).to.equal(400)
        res.body.should.have.property('message').eql('Please provide a numeric value')
        done()
      })
  })

})