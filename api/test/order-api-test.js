import chai from 'chai';
import chatHttp from 'chai-http';
import 'chai/register-should';
import app from '../index';
chai.use(chatHttp);
const { expect } = chai;

describe('Testing the order endpoints:', () => {

  it('It should create an order', (done) => {
    const table = {
      tableNumber: 7,
    }
    chai.request(app)
      .post('/api/table')
      .send(table)
      .end(() => {
        const order = {
          TableId: 1,
          statusOrder: 'pendente'
        }
        chai.request(app)
          .post('/api/order')
          .set('Accept', 'application/json')
          .send(order)
          .end((err, res) => {
            expect(res.status).to.equal(201)
            expect(res.body.data).to.include({
              id: 1,
              TableId: order.TableId,
              statusOrder: order.statusOrder
            })
            done()
          })
      })

  });

  it('It should not create an order with incomplete parameters', (done) => {
    chai.request(app)
      .post('/api/order')
      .set('Accept', 'application/json')
      .send({})
      .end((err, res) => {
        expect(res.status).to.equal(400)
        done()
      })
  });

  it('It should get all orders', (done) => {
    chai.request(app)
      .get('/api/order')
      .set('Accept', 'application/json')
      .end((err, res) => {
        expect(res.status).to.equal(200)
        res.body.data[0].should.have.property('id')
        res.body.data[0].should.have.property('TableId')
        res.body.data[0].should.have.property('statusOrder')
        done()
      })
  });

  it('It should get a particular order', (done) => {
    const orderId = 1
    chai.request(app)
      .get(`/api/order/${orderId}`)
      .set('Accept', 'application/json')
      .end((err, res) => {
        expect(res.status).to.equal(200)
        res.body.data.should.have.property('id')
        res.body.data.should.have.property('TableId')
        res.body.data.should.have.property('statusOrder')
        done()
      })
  });

  it('It should not get a particular order with invalid id', (done) => {
    const orderId = 8888
    chai.request(app)
      .get(`/api/order/${orderId}`)
      .set('Accept', 'application/json')
      .end((err, res) => {
        expect(res.status).to.equal(404)
        res.body.should.have.property('message')
          .eql(`Cannot find Order with the id ${orderId}`)
        done()
      })
  });

  it('It should not get a particular order with non-numeric id', (done) => {
    const orderId = 'aaa'
    chai.request(app)
      .get(`/api/order/${orderId}`)
      .set('Accept', 'application/json')
      .end((err, res) => {
        expect(res.status).to.equal(400)
        res.body.should.have.property('message')
          .eql('Please input a valid numeric value')
        done()
      })
  });

  it('It should update an order', (done) => {
    const orderId = 1
    const updatedOrder = {
      id: orderId,
      statusOrder: 'pronto'
    }
    chai.request(app)
      .put(`/api/order/${orderId}`)
      .set('Accept', 'application/json')
      .send(updatedOrder)
      .end((err, res) => {
        expect(res.status).to.equal(200)
        expect(res.body.data.id).equal(updatedOrder.id)
        expect(res.body.data.statusOrder).equal(updatedOrder.statusOrder)
        done()
      })
  });

  it('It should not update an order with invalid id', (done) => {
    const orderId = '9999'
    const updatedOrder = {
      id: orderId,
      statusOrder: 'finalizado',
    }
    chai.request(app)
      .put(`/api/order/${orderId}`)
      .set('Accept', 'application/json')
      .send(updatedOrder)
      .end((err, res) => {
        expect(res.status).to.equal(404)
        res.body.should.have.property('message')
          .eql(`Cannot find order with the id: ${orderId}`)
        done()
      })
  });

  it('It should not update an order with non-numeric id value', (done) => {
    const orderId = 'ggg'
    const updatedOrder = {
      id: orderId,
      statusOrder: 'pendente',
    }
    chai.request(app)
      .put(`/api/order/${orderId}`)
      .set('Accept', 'application/json')
      .send(updatedOrder)
      .end((err, res) => {
        expect(res.status).to.equal(400)
        res.body.should.have.property('message')
          .eql('Please input a valid numeric value')
        done()
      })
  });

  it('It should not delete an order with invalid id', (done) => {
    const orderId = 777
    chai.request(app)
      .delete(`/api/order/${orderId}`)
      .set('Accept', 'application/json')
      .end((err, res) => {
        expect(res.status).to.equal(404)
        res.body.should.have.property('message')
          .eql(`Order with the id ${orderId} cannot be found`)
        done()
      })
  });

  it('It should not delete an order with non-numeric id', (done) => {
    const orderId = 'bbb'
    chai.request(app)
      .delete(`/api/order/${orderId}`)
      .set('Accept', 'application/json')
      .end((err, res) => {
        expect(res.status).to.equal(400)
        res.body.should.have.property('message').eql('Please provide a numeric value')
        done()
      })
  });

  it('It should delete an order', (done) => {
    const table = {
      tableNumber: 24
    }
    const order = {
      TableId: 2,
      statusOrder: 'pendente'
    }
    const orderId = 2;

    chai.request(app)
      .post('/api/table')
      .send(table)
      .end((err, res) => {
        chai.request(app)
          .post('/api/order')
          .send(order)
          .end((err, res) => {
            chai.request(app)
              .delete(`/api/order/${orderId}`)
              .end((err, res) => {
                expect(res.status).to.equal(200)
                expect(res.body.data).to.include({})
              })
          })
        done()
      })
    chai.request(app)
      .get('/api/order')
      .end((err, res) => {
        console.log(res.body)
      })
  });
});

describe('Testing the order itens endpoints:', () => {
  it('Should create an order item', (done) => {
    const orderItem = {
      ProductId: 1,
      OrderId: 3,
      statusItem: 'pronto'
    }
    const product = {
      name: 'Mojitto',
      price: 25,
      isAlcoholic: true
    }
    const table = {
      tableNumber: 25
    }
    const order = {
      TableId: 3,
      statusOrder: 'pendente'
    }
    chai.request(app)
      .post('/api/product')
      .send(product)
      .end((err, res) => {
        chai.request(app)
          .post('/api/table')
          .send(table)
          .end(() => {
            chai.request(app)
              .post('/api/order')
              .send(order)
              .end(() => {
                chai.request(app)
                  .post('/api/order/itens')
                  .send(orderItem)
                  .end((err, res) => {
                    console.log(res.body)
                    expect(res.status).to.equal(201)
                    expect(res.body.data).to.include({
                      id: 1,
                      ProductId: 1,
                      OrderId: 3,
                      statusItem: 'pronto'
                    })
                  })
              })
          })
        done()
      })
  })

  it('It should not create an order item with incomplete parameters', (done) => {
    chai.request(app)
      .post('/api/order/itens')
      .set('Accept', 'application/json')
      .send({})
      .end((err, res) => {
        expect(res.status).to.equal(400)
        done()
      })
  });

  it('It should get all orders itens', (done) => {
    chai.request(app)
      .get('/api/order/itens')
      .set('Accept', 'application/json')
      .end((err, res) => {
        console.log(res.body)
        expect(res.status).to.equal(200)
        res.body.data[0].should.have.property('ProductId')
        res.body.data[0].should.have.property('OrderId')
        res.body.data[0].should.have.property('statusItem')
        done()
      })
  });

  // it('It should get a particular order item', (done) => {
  //   const orderItemId = 1;
  //   chai.request(app)
  //     .get(`/api/order/item/${orderItemId}`)
  //     .set('Accept', 'application/json')
  //     .end((err, res) => {
  //       console.log(res.body)
  //       expect(res.status).to.equal(200)
  //       res.body.data.should.have.property('ProductId')
  //       res.body.data.should.have.property('OrderId')
  //       res.body.data.should.have.property('statusItem')
  //       done()
  //     })
  // });

  // it('It should not get a particular order item with invalid id', (done) => {
  //   const orderItemId = 8888
  //   chai.request(app)
  //     .get(`/api/order/itens/${orderItemId}`)
  //     .set('Accept', 'application/json')
  //     .end((err, res) => {
  //       expect(res.status).to.equal(404)
  //       res.body.should.have.property('message')
  //         .eql(`Cannot find Order item with the id ${orderItemId}`)
  //       done()
  //     })
  // });

  // it('It should not get a particular order item with non-numeric id', (done) => {
  //   const orderItemId = 'aaa'
  //   chai.request(app)
  //     .get(`/api/order/itens/${orderItemId}`)
  //     .set('Accept', 'application/json')
  //     .end((err, res) => {
  //       expect(res.status).to.equal(400)
  //       res.body.should.have.property('message')
  //         .eql('Please input a valid numeric value')
  //       done()
  //     })
  // });
});
