import {describe, it} from 'mocha';
import chai from 'chai';
import chaiHttp from'chai-http';
import app from '../../server/server';

chai.use(chaiHttp);
chai.should();

describe('Signup', () => {
    it('user should be able to signup', (done) => {
        chai.request(app)
        .post('/api/v1/auth/signup')
        .send({
            email: 'raymond@gmail.com',
            first_name: 'Raymond',
            last_name: 'Gakwaya',
            password: '1234567890',
            address: 'Rwanda',
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
})
