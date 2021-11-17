let reward = require('../modal/rewardsmodal');
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../index');
chai.should();
chai.use(chaiHttp);
describe('test api', () => {

    /* GET all rewards */
    describe('GET /rewards', () => {
        it('It should get all the rewards', (done) => {
            chai.request(server)
                .get('/rewards')
                .end((err, response) => {
                    response.body.should.be.a('array');
                    response.should.have.status(200);
                    // response.body.length.should.be.eq(2);
                    done();
                });
        });

        it('It should not get all the rewards', (done) => {
            chai.request(server)
                .get('/reward')
                .end((err, response) => {
                    response.should.have.status(404);
                    done();
                });
        });
    });

    /* GET reward by Id */
    describe('GET /rewards/:id', () => {
        it('It should get the reward by id', (done) => {
            const rewardId = '61936f4a51974d45e3772a90';
            chai.request(server)
                .get('/rewards/' + rewardId)
                .end((err, response) => {
                    response.body.should.be.a('object');
                    response.should.have.status(200);
                    response.body.should.have.property('_id');
                    response.body.should.have.property('_id').eq('61936f4a51974d45e3772a90');
                    done();
                });
        });
        it('It should not get the reward by id', (done) => {
            const rewardId = '34655';
            chai.request(server)
                .get('/rewards/' + rewardId)
                .end((err, response) => {
                    response.should.have.status(404);
                    response.text.should.be.eq("Id not Found");
                    done();
                });
        });
    });

    /* POST a reward */
    describe('POST /rewards', () => {
        it('It should post the reward', (done) => {
            const reward = {
                reward_name: "ytuderd",
                reward_display_name: "gvghvh",
                reward_type: "gvjg",
                reward_sender: "Manager",
                recepients: ["Manager"],
                receiver_message: "ghgf",
                announcement_type: "public",
                slack_channel: "fdgfd",
                channel_message: "fgdfdh"
            }
            chai.request(server)
                .post('/rewards/create')
                .send(reward)
                .end((err, response) => {
                    response.body.should.be.a('object');
                    response.should.have.status(201);
                    response.body.should.have.property('_id');
                    response.body.should.have.property('reward_name');
                    response.body.should.have.property('reward_display_name');
                    response.body.should.have.property('reward_type');
                    response.body.should.have.property('reward_sender');
                    response.body.should.have.property('recepients');
                    response.body.should.have.property('receiver_message');
                    response.body.should.have.property('announcement_type');
                    response.body.should.have.property('slack_channel');
                    response.body.should.have.property('channel_message');
                    response.body.should.have.property('status');
                    response.body.should.have.property('createdAt');
                    response.body.should.have.property('updatedAt');
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
            chai.request(server)
                .post('/rewards/create')
                .send(reward)
                .end((err, response) => {
                    response.should.have.status(401);
                    response.text.should.be.eq("Required field is missing");
                    done();
                });
        });
    });

});

