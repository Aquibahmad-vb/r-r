const chai = require('chai');
const chaiHttp = require('chai-http');
const app=require("../index");
const userModal = require('../modal/usermodal');
const rewardsModal = require("../modal/rewardsmodal");

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
    "channel_message": "def messsage",
    "employee_id":101
}
let id;
let dummyreward;


describe('rewards apis',async() => {
    const admin=await userModal.findOne({email:"thanu@gmail.com"})
    const user=await userModal.findOne({email:"th@gmail.com"})
    // const admin.token='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImVtYWlsIjoiYXFAZ21haWwuY29tIiwidXNlcklkIjoiNjE5OGYwY2E0ODVkZTczNDQ0MjViMjRkIn0sImlhdCI6MTYzNzU3MjcwNywiZXhwIjoxNjM3NzQ1NTA3fQ.Sy-PJR0mnmFin5cKG-RN53m3pVjS4wPcJZQonFvfwRU'
    // const user.token='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImVtYWlsIjoiYXEyQGdtYWlsLmNvbSIsInVzZXJJZCI6IjYxOThmMjBiMWExMjU4MTc3MjQ2MjU5YSJ9LCJpYXQiOjE2Mzc1NzI3MDcsImV4cCI6MTYzNzc0NTUwN30.mpUGvyAYncWzfFiWsy8ggsZGox2cj4c17bxyyjTfGEk'
    after('execute after all testcases',(done)=>{
        userModal.findOneAndDelete({email:"thanuja2@gmail.com"})
        .exec()
        .then(()=>{
            rewardsModal.findOneAndDelete({employee_id:101})
            .exec()
            .then(()=>{
                done()
            })
        })
    });
    describe('create /rewards/create', () => {
        it('create rewards',(done)=>{
            chai.request(app)
            .post('/rewards/create')
            .set({"auth": admin.token })
            .send(data)
            .end((err,res)=>{
                id=res.body._id;
                dummyreward=res.body;
                res.should.have.status(201);
                res.body.should.be.a('object');
                res.body.should.have.property('_id');
                res.body.should.have.property('reward_name');
                res.body.should.have.property('reward_display_name');
                res.body.should.have.property('reward_type');
                res.body.should.have.property('reward_sender');
                res.body.should.have.property('recepients');
                res.body.should.have.property('receiver_message');
                res.body.should.have.property('announcement_type');
                res.body.should.have.property('slack_channel');
                res.body.should.have.property('channel_message');
                res.body.should.have.property("employee_id")
                res.body.should.have.property('status');
                res.body.should.have.property('createdAt');
                res.body.should.have.property('updatedAt');
                done();
            });
        });
        it('It should not post the reward with missing property', (done) => {
            const reward = {
                reward_display_name: "gvghvh",
                reward_type: "gvjg",
                reward_sender: "Manager",
                recepients: ["Manager"],
                receiver_message: "ghgf",
                announcement_type: "public",
                slack_channel: "fdgfd",
                channel_message: "fgdfdh"
            }
            chai.request(app)
                .post('/rewards/create')
                .set({"auth":admin.token})
                .send(reward)
                .end((err, res) => {
                    res.should.have.status(401);
                    res.text.should.be.eq("Required field is missing");
                    done();
                });
        });    
        it('it should not create rewards',(done)=>{
            chai.request(app)
            .post('/rewards/create')
            .set({"auth":user.token})
            .send(data)
            .end((err,res)=>{
                res.should.have.status(401);
                res.text.should.be.eq("not authorized user");
                done()
            })
        })
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
    "channel_message": "updated messsage",
    "employee_id":101
}
    describe("update /rewards/:id/edit",()=>{
        it("It update/edit rewards by id",(done)=>{
            chai.request(app)
            .put('/rewards/'+id+'/edit')
            .set({"auth": admin.token })
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
            .set({"auth": admin.token })
            .send(updateddata)
            .end((err,res)=>{
                res.should.have.status(404);
                res.text.should.be.eq("Id not Found");
                done();
            });   
        });
        it('it should not update rewards by id',(done)=>{
            chai.request(app)
            .put('/rewards/'+id+'1/edit')
            .set({"auth":user.token})
            .send(updateddata)
            .end((err,res)=>{
                res.should.have.status(401);
                res.text.should.be.eq("not authorized user");
                done()
            })
        })
    });

    describe('launch /rewards/:id/launch', () => {
        it('It launch reward by id',(done)=>{
            chai.request(app)
            .put('/rewards/'+id+'/launch')
            .set({"auth": admin.token })
            .end((err,res)=>{
                res.should.have.status(202);
                res.text.should.be.equal(`rewards status updated from ${dummyreward.status} to launch \n`);
                done();
            });
        });

        it('It return reward already launch',(done)=>{
            chai.request(app)
            .put('/rewards/'+id+'/launch')
            .set({"auth": admin.token })
            .end((err,res)=>{
                res.should.have.status(200);
                res.text.should.be.equal(`rewards are already launch`)
                done()
            });
        });

        it('it should not launch reward',(done)=>{
            chai.request(app)
            .put('/rewards/'+id+'1/launch')
            .set({"auth": admin.token })
            .end((err,res)=>{
                res.should.have.status(404);
                res.text.should.be.eq("Id not Found");
                done()
            });   
        });
        it('it should not launch rewards by id',(done)=>{
            chai.request(app)
            .put('/rewards/'+id+'1/launch')
            .set({"auth":user.token})
            .end((err,res)=>{
                res.should.have.status(401);
                res.text.should.be.eq("not authorized user");
                done()
            });
        });
    });

    describe('GET /rewards/:id', () => {
        it('It should get the reward by id', (done) => {
            chai.request(app)
                .get('/rewards/' + id)
                .set({"auth":admin.token})
                .end((err, res) => {
                    res.body.should.be.a('object');
                    res.should.have.status(200);
                    res.body.should.have.property('_id');
                    res.body.should.have.property('_id').eq(id);
                    done();
                });
        });
        it('It should not get the reward by id', (done) => {
            chai.request(app)
                .get('/rewards/' + id+'1')
                .set({"auth":admin.token})
                .end((err, res) => {
                    res.should.have.status(404);
                    res.text.should.be.eq("Id not Found");
                    done();
                });
        });
        it('it should not get rewards by id',(done)=>{
            chai.request(app)
            .get('/rewards/'+id)
            .set({"auth":user.token})
            .end((err,res)=>{
                res.should.have.status(401);
                res.text.should.be.eq("not authorized user");
                done()
            });
        });
    });
    describe('GET /rewards', () => {
        it('It should get all the rewards', (done) => {
            // console.log(admin)
            chai.request(app)
                .get('/rewards')
                .set({"auth":admin.token})
                .end((err, res) => {
                    res.body.should.be.a('array');
                    res.should.have.status(200);
                    res.body.length.should.be.eql(10);
                    done();
                });
        });
        it("it should get all item sorted by name",(done)=>{
            chai.request(app)
            .get('/rewards')
            .set({"auth": admin.token})
            .query({"sort":"name"})
            .end((err,res)=>{
                res.body.should.be.a('array');
                res.should.have.status(200);
                res.body.length.should.be.eql(10)
                done();
            });
        });
        it("it should get all item sorted by id of page 2",(done)=>{
            chai.request(app)
            .get('/rewards')
            .set({"auth": admin.token})
            .query({"sort":"id","pageNo":"2"})
            .end((err,res)=>{
                res.body.should.be.a('array');
                res.should.have.status(200);
                res.body.length.should.be.eql(10)
                done();
            });
        });
        it("it should get all item sorted by date of page 2",(done)=>{
            chai.request(app)
            .get('/rewards')
            .set({"auth": admin.token})
            .query({"sort":"date","pageNo":"2"})
            .end((err,res)=>{
                res.body.should.be.a('array');
                res.should.have.status(200);
                res.body.length.should.be.eql(10)
                done();
            });
        });
        it("it should get all item of page 3",(done)=>{
            chai.request(app)
            .get('/rewards')
            .set({"auth": admin.token})
            .query({"pageNo":"3"})
            .end((err,res)=>{
                res.body.should.be.a('array');
                res.should.have.status(200);
                res.body.length.should.be.eql(10)
                done();
            });
        });
        it('It should not get all the rewards', (done) => {
            chai.request(app)
                .get('/reward')
                .set({"auth":admin.token})
                .end((err, res) => {
                    res.should.have.status(404);
                    done();
            });
        });
        it('it should not get all rewards',(done)=>{
            chai.request(app)
                .get('/rewards')
                .set({"auth":user.token})
                .end((err,res)=>{
                    res.should.have.status(401);
                    res.text.should.be.eq("not authorized user");
                    done()
            });
        });
    });
    describe('delete /rewards/:id', () => {
        it('It delete rewards by id ',(done)=>{
            chai.request(app)
            .delete('/rewards/'+id)
            .set({"auth": admin.token })
            .end((err,res)=>{
                res.should.have.status(200);
                res.text.should.be.equal(`1 reward deleted with id ${id}`)
                done()
            });
        });
        it('it should not delete rewards by id',(done)=>{
            chai.request(app)
            .delete('/rewards/'+id+'1')
            .set({"auth": admin.token })
            .end((err,res)=>{
                res.should.have.status(404);
                res.text.should.be.eq("Id not Found");
                done()
            });   
        });
        it('it should not delete rewards by id',(done)=>{
            chai.request(app)
            .delete('/rewards/'+id+'1')
            .set({"auth":user.token})
            .end((err,res)=>{
                res.should.have.status(401);
                res.text.should.be.eq("not authorized user");
                done()
            });
        });
    });
    describe('get /search', ()=>{
        it('It search and give any matches found in reward_type', (done)=>{
            chai.request(app)
            .get('/search')
            .set({"auth":admin.token})
            .query({search: 'an'})
            .end((err,res)=>{
                res.should.have.status(200);
                done();
            });
        });
        it('It search and give when no matches found in reward_type', (done)=>{
            chai.request(app)
            .get('/search')
            .set({"auth":admin.token})
            .query({search: 'anrt'})
            .end((err,res)=>{
                res.should.have.status(401);
                res.text.should.be.eq("No rewards found");
                done();
            });
        });
        it('It gives error when query is missing', (done)=>{
            chai.request(app)
            .get('/search')
            .set({"auth":admin.token})
            .query()
            .end((err,res)=>{
                res.should.have.status(500);
                res.body.should.be.a('object');
                res.body.should.have.property('status').eq('error');
                res.body.should.have.property('msg').eq('Query param is missing.');
                done();
            });
        });
    });
});
