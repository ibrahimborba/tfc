import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import { app } from '../app';
import { Response } from 'superagent';
import { response } from 'express';

chai.use(chaiHttp);
const { expect } = chai;

describe('Test matches routes', () => {
  let chaiHttpResponse: Response;

  describe('GET /matches', () => {
    before(async () => {
      chaiHttpResponse = await chai
      .request(app)
      .get('/matches');
    });

    it('returns status code 200', async () => {
      expect(chaiHttpResponse).to.have.status(200);
    });
  
    it('returns an array', async () => {  
      expect(chaiHttpResponse.body).to.be.an('array');
    });

    it('returns an array that elements are objects with teams names', async () => {  
      expect(chaiHttpResponse.body[0]).to.have.property('teamHome');
      expect(chaiHttpResponse.body[0]).to.have.property('teamAway');
    });
  })

  describe('GET /matches with query', () => {
    before(async () => {
      chaiHttpResponse = await chai
      .request(app)
      .get('/matches?inProgress=true');
    });

    it('returns status code 200', async () => {
      expect(chaiHttpResponse).to.have.status(200);
    });
  
    it('returns an array', async () => {  
      expect(chaiHttpResponse.body).to.be.an('array');
    });

    it('returns an array that elements are objects with teams names', async () => {  
      expect(chaiHttpResponse.body[0].inProgress).to.be.equal(true);
    });
  })

  describe('POST /matches', () => {
    let validateResponse: Response;
    before(async () => {
      chaiHttpResponse = await chai
      .request(app)
      .post('/login')
      .send({
       email: 'user@user.com',
       password: 'secret_user',
     });

     validateResponse = await chai
     .request(app)
     .post('/matches')
     .set('authorization', chaiHttpResponse.body.token)
     .send({
      homeTeam: 16,
      awayTeam: 8,
      homeTeamGoals: 2,
      awayTeamGoals: 2,
    });
    });

    it('returns status code 201', async () => {
      expect(validateResponse).to.have.status(201);
    });
    it('returns an object', async () => {
      expect(validateResponse.body).to.be.an('object');
    });
  })

  describe('POST /matches same team error', () => {
    let validateResponse: Response;
    before(async () => {
      chaiHttpResponse = await chai
      .request(app)
      .post('/login')
      .send({
       email: 'user@user.com',
       password: 'secret_user',
     });

     validateResponse = await chai
     .request(app)
     .post('/matches')
     .set('authorization', chaiHttpResponse.body.token)
     .send({
      homeTeam: 16,
      awayTeam: 16,
      homeTeamGoals: 2,
      awayTeamGoals: 2,
    });
    });

    it('returns status code 401', async () => {
      expect(validateResponse).to.have.status(401);
    });
    it('returns an object with a message', async () => {
      expect(validateResponse.body).to.have.property('message');
    });
  })

  describe('POST /matches inexistent team error', () => {
    let validateResponse: Response;
    before(async () => {
      chaiHttpResponse = await chai
      .request(app)
      .post('/login')
      .send({
       email: 'user@user.com',
       password: 'secret_user',
     });

     validateResponse = await chai
     .request(app)
     .post('/matches')
     .set('authorization', chaiHttpResponse.body.token)
     .send({
      homeTeam: 100,
      awayTeam: 16,
      homeTeamGoals: 2,
      awayTeamGoals: 2,
    });
    });

    it('returns status code 404', async () => {
      expect(validateResponse).to.have.status(404);
    });
    it('returns an object with a message', async () => {
      expect(validateResponse.body).to.have.property('message');
    });
  })

  describe('PATCH /matches/:id/finish', () => {
    before(async () => {
     chaiHttpResponse = await chai
     .request(app)
     .patch('/matches/45/finish');
    });

    it('returns status code 200', async () => {
      expect(chaiHttpResponse).to.have.status(200);
    });
    it('returns an object with a message', async () => {
      expect(chaiHttpResponse.body).to.have.property('message');
    });
  })

  describe('PATCH /matches/:id', () => {
    before(async () => {
     chaiHttpResponse = await chai
     .request(app)
     .patch('/matches/1')
     .send({
      homeTeamGoals: 3,
      awayTeamGoals: 1,
      });
    });

    it('returns status code 200', async () => {
      expect(chaiHttpResponse).to.have.status(200);
    });
    it('returns an object with a message', async () => {
      expect(chaiHttpResponse.body).to.have.property('message');
    });
  })

});