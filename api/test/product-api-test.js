import chai from 'chai';
import chatHttp from 'chai-http';
import 'chai/register-should';
import app from '../index';
chai.use(chatHttp);
const { expect } = chai;

describe('Testing the product endpoints:', () => {
  it('It should create a product', (done) => {
    const product = {
      name: 'your drink',
      price: 10,
      isAlcoholic: true
    }
    chai.request(app)
      .post('/api/product')
      .set('Accept', 'application/json')
      .send(product)
      .end((err, res) => {
        expect(res.status).to.equal(201)
        expect(res.body.data).to.include({
          id: 2,
          name: product.name,
          price: product.price,
          isAlcoholic: product.isAlcoholic
        })
        done()
      })
  });

  it('It should not create a product with incomplete parameters', (done) => {
    const product = {
      isAlcoholic: true
    }
    chai.request(app)
      .post('/api/product')
      .set('Accept', 'application/json')
      .send(product)
      .end((err, res) => {
        expect(res.status).to.equal(400)
        done()
      })
  });

  it('It should get all products', (done) => {
    chai.request(app)
      .get('/api/product')
      .set('Accept', 'application/json')
      .end((err, res) => {
        expect(res.status).to.equal(200)
        res.body.data[0].should.have.property('id')
        res.body.data[0].should.have.property('name')
        res.body.data[0].should.have.property('price')
        res.body.data[0].should.have.property('isAlcoholic')
        done()
      })
  });

  it('It should get a particular product', (done) => {
    const productId = 1
    chai.request(app)
      .get(`/api/product/${productId}`)
      .set('Accept', 'application/json')
      .end((err, res) => {
        expect(res.status).to.equal(200)
        res.body.data.should.have.property('id')
        res.body.data.should.have.property('name')
        res.body.data.should.have.property('price')
        res.body.data.should.have.property('isAlcoholic')
        done()
      })
  });

  it('It should not get a particular product with invalid id', (done) => {
    const productId = 8888
    chai.request(app)
      .get(`/api/product/${productId}`)
      .set('Accept', 'application/json')
      .end((err, res) => {
        expect(res.status).to.equal(404)
        res.body.should.have.property('message')
          .eql(`Cannot find Product with the id ${productId}`)
        done()
      })
  });

  it('It should not get a particular product with non-numeric id', (done) => {
    const productId = 'aaa'
    chai.request(app)
      .get(`/api/product/${productId}`)
      .set('Accept', 'application/json')
      .end((err, res) => {
        expect(res.status).to.equal(400)
        res.body.should.have.property('message')
          .eql('Please input a valid numeric value')
        done()
      })
  });

  it('It should update a product', (done) => {
    const productId = 1
    const updateProduct = {
      id: productId,
      name: 'Updated your product',
      price: 10,
      isAlcoholic: false
    }
    chai.request(app)
      .put(`/api/product/${productId}`)
      .set('Accept', 'application/json')
      .send(updateProduct)
      .end((err, res) => {
        expect(res.status).to.equal(200)
        expect(res.body.data.id).equal(updateProduct.id)
        expect(res.body.data.name).equal(updateProduct.name)
        expect(res.body.data.price).equal(updateProduct.price)
        expect(res.body.data.isAlcoholic).equal(updateProduct.isAlcoholic)
        done()
      })
  });

  it('It should not update a product with invalid id', (done) => {
    const productId = '9999'
    const updateProduct = {
      id: productId,
      name: 'Updated your Product again',
      price: 10,
      isAlcoholic: false
    }
    chai.request(app)
      .put(`/api/product/${productId}`)
      .set('Accept', 'application/json')
      .send(updateProduct)
      .end((err, res) => {
        expect(res.status).to.equal(404)
        res.body.should.have.property('message')
          .eql(`Cannot find Product with the id: ${productId}`)
        done()
      })
  })

  it('It should not update a product with non-numeric id value', (done) => {
    const productId = 'ggg'
    const updateProduct = {
      id: productId,
      name: 'Updated your product again',
      price: 10,
      isAlcoholic: false
    }
    chai.request(app)
      .put(`/api/product/${productId}`)
      .set('Accept', 'application/json')
      .send(updateProduct)
      .end((err, res) => {
        expect(res.status).to.equal(400)
        res.body.should.have.property('message')
          .eql('Please input a valid numeric value')
        done()
      })
  })

  it('It should delete a product', (done) => {
    const product = {
      name: 'Cuba Libre',
      price: 15,
      isAlcoholic: true
    }
    const productId = 3;
    chai.request(app)
      .post('/api/product')
      .send(product)
      .end(() => {
        chai.request(app)
          .delete(`/api/product/${productId}`)
          .set('Accept', 'application/json')
          .end((err, res) => {
            expect(res.status).to.equal(200)
            expect(res.body.data).to.include({})
            chai.request(app)
              .get('/api/product')
              .end((err, res) => {
                console.log(res.body)
              })
          })
      })
    done()
  });

  it('It should not delete a product with invalid id', (done) => {
    const productId = 777
    chai.request(app)
      .delete(`/api/product/${productId}`)
      .set('Accept', 'application/json')
      .end((err, res) => {
        expect(res.status).to.equal(404)
        res.body.should.have.property('message')
          .eql(`Product with the id ${productId} cannot be found`)
        done()
      })
  });

  it('It should not delete a product with non-numeric id', (done) => {
    const productId = 'bbb'
    chai.request(app)
      .delete(`/api/product/${productId}`)
      .set('Accept', 'application/json')
      .end((err, res) => {
        expect(res.status).to.equal(400)
        res.body.should.have.property('message').eql('Please provide a numeric value')
        done()
      })
  });
});