import chai from 'chai';
import chaiHttp from 'chai-http';
import {describe, it} from 'mocha';
import app from '../../server/server';
import ENV from 'dotenv';
import jwt from 'jsonwebtoken';



chai.use(chaiHttp);
chai.should();
ENV.config();

describe("user post a car ",() => {

    it("should not be able to post if not token provided",(done) => {
        chai.request(app)
        .post('/api/v1/car')
        .send({
            state:"new",
            status: "sold",
            price: "209",
            manufacturer: "Toyota",
            model: "2 doors",
            bodyType: "MiniBus"
        })
        .end((err, res) => {

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


    it("should  be able to post if the token is given ",(done) => {
        chai.request(app)
        .post('/api/v1/car')
        .set('x-auth-token',token)
        .send({
            state:"new",
            price: 209,
            manufacturer: "Toyota",
            model: "2 doors",
            bodyType: "MiniBus"
        })
        .end((err, res) => {
            res.should.have.status(201);
            res.should.be.an('object');
            res.should.have.property('status').eql(201);
            res.body.should.have.property('data');
            done();
        });
    });



    it("should not be able to post a car if there is an error ",(done) => {
        chai.request(app)
        .post('/api/v1/car')
        .set('x-auth-token',token)
        .send({
            state:"new",
            price: "sdfasdf",
            manufacturer: "Toyota",
            model: "2 doors",
            bodyType: "MiniBus"
        })
        .end((err, res) => {

            res.should.have.status(400);
            res.should.be.an('object');
            res.should.have.property('status').eql(400);
            res.body.should.have.property('error');
            done();
        });
    });



  });



















// test for updating the price

  describe("user is updateing a price of a car ",() => {

    it("should not be able to update if not token provided",(done) => {
        chai.request(app)
        .patch('/api/v1/car/1/price')
        .send({
            new_price: 209
        })
        .end((_err, res) => {
            res.should.have.status(401);
            done();
        });
    });

    const payload = {
        id:1,
        first_name: "crispy",
        last_name: "nshimyu",
        email: "crispy@gmail.com",
        address: "Rwanda",
    }

    const token =  jwt.sign(payload, process.env.JWT_SECRET_KEY,{expiresIn:'1d'});

    it("should not be able to update if there is an error in your input",(done) => {
        chai.request(app)
        .patch('/api/v1/car/1/price')
        .set('x-auth-token',token)
        .send({
            new_price: "kjahsd"
        })
        .end((_err, res) => {
            res.should.have.status(400);
            res.should.be.an('object');
            res.should.have.property('status').eql(400);
            res.body.should.have.property('error');
            done();
        });
    });


    it("should not be able to update if car is not available in the model",(done) => {
        chai.request(app)
        .patch('/api/v1/car/8/price')
        .set('x-auth-token',token)
        .send({
            new_price: 209
        })
        .end((_err, res) => {
            res.should.have.status(400);
            res.should.be.an('object');
            res.body.should.have.property('status').eql(400);
            res.body.should.have.property('error');
            done();
        });
    });



    it("should  be able to update if car is found and request is done by the owner ",(done) => {
        chai.request(app)
        .patch('/api/v1/car/1/price')
        .set('x-auth-token',token)
        .send({
            new_price: 209
        })
        .end((_err, res) => {
            res.should.have.status(200);
            res.should.be.an('object');
            res.body.should.have.property('status').eql(200);
            res.body.should.have.property('data');
            done();
        });
    });

    it("should not be able to update if car is found car but you are the owner",(done) => {
        chai.request(app)
        .patch('/api/v1/car/3/price')
        .set('x-auth-token',token)
        .send({
            new_price: 209
        })
        .end((_err, res) => {
            res.should.have.status(403);
            res.should.be.an('object');
            res.body.should.have.property('status').eql(403);
            res.body.should.have.property('error');
            done();
        });
    });

  });
















  // User wants to view a single car

  describe("When a user wants to view a car ",() => {

    it("should not be able to view a car with no token provided",(done) => {
        chai.request(app)
        .get('/api/v1/car/1')
        .send()
        .end((err, res) => {
            res.should.have.status(401);
            done();
        });
    });

    const payload = {
        id:1,
        first_name: "crispy",
        last_name: "nshimyu",
        email: "crispy@gmail.com",
        address: "Rwanda",
    }

    const token =  jwt.sign(payload, process.env.JWT_SECRET_KEY,{expiresIn:'1d'});

    it("should not be able to view a car if you are not the owner",(done) => {
        chai.request(app)
        .get('/api/v1/car/2')
        .set('x-auth-token',token)
        .send()
        .end((err, res) => {
            res.should.have.status(400);
            res.should.be.an('object');
            res.should.have.property('status').eql(400);
            res.body.should.have.property('error');
            done();
        });
    });


    it("should not be able to update if the car is not available ",(done) => {
        chai.request(app)
        .get('/api/v1/car/30')
        .set('x-auth-token',token)
        .send()
        .end((err, res) => {
            res.should.have.status(400);
            res.should.be.an('object');
            res.body.should.have.property('status').eql(400);
            res.body.should.have.property('error');
            done();
        });
    });



    it("should  be able to view the car if you are the owner ",(done) => {
        chai.request(app)
        .patch('/api/v1/car/1/price')
        .set('x-auth-token',token)
        .send()
        .end((err, res) => {
            res.should.have.status(200);
            res.should.be.an('object');
            res.body.should.have.property('status').eql(200);
            res.body.should.have.property('data');
            done();
        });
    });


  });



  


























///admin to delete a car

  describe("Admin wants to delete a car ",() => {

    it("should not be able to delete a car with no token provided",(done) => {
        chai.request(app)
        .delete('/api/v1/car/1')
        .send()
        .end((err, res) => {
            res.should.have.status(401);
            done();
        });
    });

    const Userpayload = {
        id:1,
        first_name: "crispy",
        last_name: "nshimyu",
        email: "crispy@gmail.com",
        address: "Rwanda",
        is_admin:false
    }

    const token =  jwt.sign(Userpayload, process.env.JWT_SECRET_KEY,{expiresIn:'1d'});

    it("should not be able to delete a car if you are not the admin",(done) => {
        chai.request(app)
        .delete('/api/v1/car/2')
        .set('x-auth-token',token)
        .send()
        .end((err, res) => {
            res.should.have.status(403);
            res.should.be.an('object');
            res.should.have.property('status').eql(403);
            res.body.should.have.property('error');
            done();
        });
    });


    const Adminpayload = {
        id:1,
        first_name: "crispy",
        last_name: "nshimyu",
        email: "crispy@gmail.com",
        address: "Rwanda",
        is_admin:true
    }

    const token2 =  jwt.sign(Adminpayload, process.env.JWT_SECRET_KEY,{expiresIn:'1d'});

    it("should not be able to delete a car if you are the admin",(done) => {
        chai.request(app)
        .delete('/api/v1/car/2')
        .set('x-auth-token',token2)
        .send()
        .end((err, res) => {
            res.should.have.status(200);
            res.should.be.an('object');
            res.should.have.property('status').eql(200);
            res.body.should.have.property('message');
            done();
        });
    });






  });



  
