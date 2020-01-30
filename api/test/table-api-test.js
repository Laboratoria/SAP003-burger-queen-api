import chai from 'chai';
import chatHttp from 'chai-http';
import 'chai/register-should';
import app from '../index';
chai.use(chatHttp);
const { expect } = chai;

describe('Testing the table endpoints:', () => {
  it('It should create a table', (done) => {
    const table = {
      tableNumber: 1,
    }
    chai.request(app)
      .post('/api/table')
      .set('Accept', 'application/json')
      .send(table)
      .end((err, res) => {
        expect(res.status).to.equal(201)
        expect(res.body.data).to.include({
          id: 4,
          tableNumber: table.tableNumber,
        })
        done()
      })
  });

  it('It should not create a table with incomplete parameters', (done) => {
    chai.request(app)
      .post('/api/table')
      .set('Accept', 'application/json')
      .send({})
      .end((err, res) => {
        expect(res.status).to.equal(400)
        done()
      })
  });

  it('It should get all tables', (done) => {
    chai.request(app)
      .get('/api/table')
      .set('Accept', 'application/json')
      .end((err, res) => {
        expect(res.status).to.equal(200)
        res.body.data[0].should.have.property('id')
        res.body.data[0].should.have.property('tableNumber')
        done()
      })
  });

  it('It should get a particular table', (done) => {
    const tableId = 2
    chai.request(app)
      .get(`/api/table/${tableId}`)
      .set('Accept', 'application/json')
      .end((err, res) => {
        expect(res.status).to.equal(200)
        res.body.data.should.have.property('id')
        res.body.data.should.have.property('tableNumber')
        done()
      })
  });

  it('It should not get a particular table with invalid id', (done) => {
    const tableId = 8888
    chai.request(app)
      .get(`/api/table/${tableId}`)
      .set('Accept', 'application/json')
      .end((err, res) => {
        expect(res.status).to.equal(404)
        res.body.should.have.property('message')
          .eql(`Cannot find Table with the id ${tableId}`)
        done()
      })
  });

  it('It should not get a particular table with non-numeric id', (done) => {
    const tableId = 'aaa'
    chai.request(app)
      .get(`/api/table/${tableId}`)
      .set('Accept', 'application/json')
      .end((err, res) => {
        expect(res.status).to.equal(400)
        res.body.should.have.property('message')
          .eql('Please input a valid numeric value')
        done()
      })
  });

  it('It should update a table', (done) => {
    const tableId = 2
    const updatedTable = {
      id: tableId,
      tableNumber: 2,
    }
    chai.request(app)
      .put(`/api/table/${tableId}`)
      .set('Accept', 'application/json')
      .send(updatedTable)
      .end((err, res) => {
        expect(res.status).to.equal(200)
        expect(res.body.data.id).equal(updatedTable.id)
        expect(res.body.data.tableNumber).equal(updatedTable.tableNumber)
        done()
      })
  });

  it('It should not update a table with invalid id', (done) => {
    const tableId = '9999'
    const updatedTable = {
      id: tableId,
      tableNumber: 4
    }
    chai.request(app)
      .put(`/api/table/${tableId}`)
      .set('Accept', 'application/json')
      .send(updatedTable)
      .end((err, res) => {
        expect(res.status).to.equal(404)
        res.body.should.have.property('message')
          .eql(`Cannot find Table with the id: ${tableId}`)
        done()
      })
  });

  it('It should not update a table with non-numeric id value', (done) => {
    const tableId = 'ggg'
    const updatedTable = {
      id: tableId,
      tableNumber: 5
    }
    chai.request(app)
      .put(`/api/table/${tableId}`)
      .set('Accept', 'application/json')
      .send(updatedTable)
      .end((err, res) => {
        expect(res.status).to.equal(400)
        res.body.should.have.property('message')
          .eql('Please input a valid numeric value')
        done()
      })
  });

  it('It should delete a table', (done) => {
    const table = {
      tableNumber: 1,
    }
    chai.request(app)
      .post('/api/table')
      .set('Accept', 'application/json')
      .send(table)
      .end(() => {
        const tableId = 4
        chai.request(app)
          .delete(`/api/table/${tableId}`)
          .set('Accept', 'application/json')
          .end((err, res) => {
            expect(res.status).to.equal(200)
            expect(res.body.data).to.include({})
            chai.request(app)
              .get('/api/table')
              .end((err, res) => {
                console.log(res.body)
              })
            done()
          })
      })
  });

  it('It should not delete a table with invalid id', (done) => {
    const tableId = 777
    chai.request(app)
      .delete(`/api/table/${tableId}`)
      .set('Accept', 'application/json')
      .end((err, res) => {
        expect(res.status).to.equal(404)
        res.body.should.have.property('message')
          .eql(`Table with the id ${tableId} cannot be found`)
        done()
      })
  });

  it('It should not delete a table with non-numeric id', (done) => {
    const tableId = 'bbb'
    chai.request(app)
      .delete(`/api/table/${tableId}`)
      .set('Accept', 'application/json')
      .end((err, res) => {
        expect(res.status).to.equal(400)
        res.body.should.have.property('message').eql('Please provide a numeric value')
        done()
      })
  });
});