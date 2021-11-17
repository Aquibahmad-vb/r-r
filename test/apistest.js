const chai = require('chai');
const chaiHttp = require('chai-http');
const app=require("../index");

chai.should();
chai.use(chaiHttp);

const data={
    "reward_name":"reward def",
    "reward_display_name": "reward def",
    "reward_type": "reward def",
    "reward_sender": "Manager",
    "recepients": ["Employee"],
    "receiver_message": "def",
    "announcement_type": "def",
    "slack_channel": "#birthday",
    "channel_message": "def messsage"
}
let id;
let dummyreward;

describe('rewards apis', () => {
    
    describe('create /rewards/create', () => {
        it('create rewards',(done)=>{
            chai.request(app)
            .post('/rewards/create')
            .send(data)
            .end((err,res)=>{
                id=res.body._id;
                dummyreward=res.body;
                res.should.have.status(201);
                res.body.should.be.a('object');
                done();
            });
        });    
    });

const updateddata={
    "reward_name":"reward update",
    "reward_display_name": "reward update",
    "reward_type": "reward def",
    "reward_sender": "Manager",
    "recepients": ["Employee"],
    "receiver_message": "def",
    "announcement_type": "def",
    "slack_channel": "#birthday",
    "channel_message": "updated messsage"
}
    describe("update /rewards/:id/edit",()=>{
        it("It update/edit rewards by id",(done)=>{
            chai.request(app)
            .put('/rewards/'+id+'/edit')
            .send(updateddata)
            .end((err,res)=>{
                res.should.have.status(202);
                res.text.should.be.equal(`1 rewards updated \n`)
                done();
            });
        });

        it('it should not update/edit rewards by id',(done)=>{
            chai.request(app)
            .put('/rewards/'+id+'1/edit')
            .send(updateddata)
            .end((err,res)=>{
                res.should.have.status(404);
                res.text.should.be.eq("Id not Found");
                done();
            });   
        });
    });

    describe('launch /rewards/:id/launch', () => {
        it('It launch reward by id',(done)=>{
            chai.request(app)
            .put('/rewards/'+id+'/launch')
            .end((err,res)=>{
                res.should.have.status(202);
                res.text.should.be.equal(`rewards status updated from ${dummyreward.status} to launch \n`);
                done();
            });
        });

        it('It return reward already launch',(done)=>{
            chai.request(app)
            .put('/rewards/'+id+'/launch')
            .end((err,res)=>{
                res.should.have.status(200);
                res.text.should.be.equal(`rewards are already launch`)
                done()
            });
        });

        it('it should not launch reward',(done)=>{
            chai.request(app)
            .put('/rewards/'+id+'1/launch')
            .end((err,res)=>{
                res.should.have.status(404);
                res.text.should.be.eq("Id not Found");
                done()
            });   
        });
    });

    describe('delete /rewards/:id', () => {
        it('It delete rewards by id ',(done)=>{
            chai.request(app)
            .delete('/rewards/'+id)
            .end((err,res)=>{
                res.should.have.status(200);
                res.text.should.be.equal(`1 reward deleted with id ${id}`)
                done()
            });
        });
        it('it should not delete rewards by id',(done)=>{
            chai.request(app)
            .delete('/rewards/'+id+'1')
            .end((err,res)=>{
                res.should.have.status(404);
                res.text.should.be.eq("Id not Found");
                done()
            });   
        });
        
    });
});