import chai from 'chai';
import {describe, it} from 'mocha'
import chaiHttp from 'chai-http';
import app from '../../server/server';

chai.use(chaiHttp);
chai.should();



  describe("user is trying to log in ",() => {

    it("should be able to login",(done) => {
        chai.request(app)
        .post('/api/v1/auth/signin')
        .send({
            email: "crispy@gmail.com",
            password: "kigali12345"
        })
        .end((err, res) => {
            res.should.have.status(200);
            res.should.be.an('object');
            res.should.have.property('status').eql(200);
            res.body.should.have.property('data');
            res.body.should.have.status(200);
            done();
        });
    });

    it("should not be able to login if the email is incorrect",(done) => {
        chai.request(app)
        .post('/api/v1/auth/signin')
        .send({
            email: "crisjpy@gmail.com",
            password: "kigali12345"
        })
        .end((err, res) => {
            res.should.have.status(400);
            res.should.be.an('object');
            res.should.have.property('status').eql(400);
            res.body.should.have.property('error');
            res.body.should.have.status(400);
            done();
        });
    });
 
    it("should not be able to login if the password is incorrect",(done) => {
        chai.request(app)
        .post('/api/v1/auth/signin')
        .send({
            email: "crispy@gmail.com",
            password: "kigali12"
        })
        .end((err, res) => {
            res.should.have.status(400);
            res.should.be.an('object');
            res.should.have.property('status').eql(400);
            res.body.should.have.property('error');
            res.body.should.have.status(400);
            done();
        });
    });

    it("should not be able to login if the email or the password is incorrect ",(done) => {
        chai.request(app)
        .post('/api/v1/auth/signin')
        .send({
            email: "crispy@gmail.com",
            password: "kigali1234565776756756754"
        })
        .end((err, res) => {
            res.should.have.status(400);
            res.should.be.an('object');
            res.should.have.property('status').eql(400);
            res.body.should.have.property('error');
            res.body.should.have.status(400);
            done();
        });
    });

  });
