const chai = require('chai');
const chaiHttp = require('chai-http');
const app=require("../index");
const userModal = require('../modal/usermodal');

chai.should();
chai.use(chaiHttp);

const userdata={
    email:"aq4@gmail.com",
    password:"aquib",
    role:"admin"

}
describe('signup and login',()=>{
    describe('post /signup',()=>{
        it('it should create a user',(done)=>{
            chai.request(app)
            .post('/signup')
            .send(userdata)
            .end((err,res)=>{
                res.should.have.status(201)
                res.body.should.have.property("message").equal("user created");
                done()
            })
        });
        it('it should not create a user',(done)=>{
            chai.request(app)
            .post('/signup')
            .send(userdata)
            .end((err,res)=>{
                res.should.have.status(409)
                res.body.should.have.property("message").equal("Mail already Exists");
                done()
            })
        });
    });
    describe('post /login',()=>{
        it('it should login user',(done)=>{
            chai.request(app)
            .post('/login')
            .send({
                email:"aq4@gmail.com",
                password:"aquib"
            })
            .end((err,res)=>{
                res.should.have.status(201)
                res.body.should.have.property("message").equal("login successful");
                res.body.should.have.property("token")
                done()
            });
        });
        it('it should login user',(done)=>{
            chai.request(app)
            .post('/login')
            .send({
                email:"aq4@gmail.com",
                password:"aqui"
            })
            .end((err,res)=>{
                res.should.have.status(401)
                res.body.should.have.property("message").equal("login failed");
                done()
            });
        });
    });
});