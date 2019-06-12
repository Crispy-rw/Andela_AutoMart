import { describe, it } from 'mocha';
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../server/server';

chai.use(chaiHttp);
chai.should();

describe(' when a user is signing up', () => {
  it('user should be able to signup', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send({
        email: 'cris@gmail.com',
        first_name: 'crispy',
        last_name: 'nshimyumukiza',
        password: 'kigali1234',
        address: 'Rwafnda',
        is_admin: false,
      })
      .end((err, res) => {
        res.should.have.status(201);
        res.should.be.an('object');
        res.body.should.have.property('status').eql(201);
        res.body.should.have.property('data');
        done();
      });
  });


  it('use should not be registered if there is a missing fiels', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send({
        email: 'crispy@gmail.com',
        first_name: 'crispy',
        last_name: 'nshimyumukiza',
        password: '45235424',
        is_admin: false,
      })
      .end((err, res) => {
        res.should.have.status(400);
        res.should.be.an('object');
        res.should.have.property('status').eql(400);
        res.should.have.property('error');
        done();
      });
  });

  it('should not be registered if the email has already been used', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send({
        email: 'crispy@gmail.com',
        first_name: 'crispy',
        last_name: 'nshimyumukiza',
        password: 'kigali1234',
        address: 'Rwafnda',
        is_admin: false,
      }).end((err, res) => {
        res.should.have.status(400);
        res.should.be.an('object');
        res.should.have.property('status').eql(400);
        res.should.have.property('error');
        done();
      });
  });
});
