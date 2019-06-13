import chai from 'chai';
import chaiHttp from 'chai-http';
import {describe, it} from 'mocha';
import app from '../../server/server';
import ENV from 'dotenv';
import jwt from 'jsonwebtoken';

chai.use(chaiHttp);
chai.should();
ENV.config();


describe("user post a purchase order ",() => {

    it("should not be able to post an order if not token provided",(done) => {
        chai.request(app)
        .post('/api/v1/order/')
        .send({
            buyer:2,
            car_id:1,
            amount: 2000,
            status: "pending"
        })
        .end((_err, res) => {

            res.should.have.status(401);
            
            done();
        });
    });

    const payload = {
        id:2,
        first_name: "crispy",
        last_name: "nshimyu",
        email: "crispy@gmail.com",
        address: "Rwanda",
    }

    const token =  jwt.sign(payload, process.env.JWT_SECRET_KEY,{expiresIn:'1d'});

    it("should not be able to post an order if token is provided",(done) => {
        chai.request(app)
        .post('/api/v1/order/')
        .set('x-auth-token',token)
        .send({
            buyer:2,
            car_id:1,
            amount: 2000,
            status: "pending"
        })
        .end((_err, res) => {
             res.should.have.status(200);
             res.should.have.status(200);
             res.should.be.an('object');
             res.should.have.property('status').eql(200);
             res.body.should.have.property('data');
            
            done();
        });
    });

  });
