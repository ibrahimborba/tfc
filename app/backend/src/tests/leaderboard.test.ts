import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import { app } from '../app';
import { Response } from 'superagent';
import { response } from 'express';

chai.use(chaiHttp);
const { expect } = chai;

describe('Test leaderboard routes', () => {
  let chaiHttpResponse: Response;

  describe('GET /leaderboard/home', () => {
    before(async () => {
      chaiHttpResponse = await chai
      .request(app)
      .get('/leaderboard/home');
    });

    it('returns status code 200', () => {
      expect(chaiHttpResponse).to.have.status(200);
    });
  
    it('returns an array', () => {  
      expect(chaiHttpResponse.body).to.be.an('array');
    });

    it('returns an array that elements are objects with teams scores', () => {  
      expect(chaiHttpResponse.body[0]).to.have.property('totalPoints');
    });
  })

  describe('GET /leaderboard/away', () => {
    before(async () => {
      chaiHttpResponse = await chai
      .request(app)
      .get('/leaderboard/away');
    });

    it('returns status code 200', () => {
      expect(chaiHttpResponse).to.have.status(200);
    });
  
    it('returns an array', () => {  
      expect(chaiHttpResponse.body).to.be.an('array');
    });

    it('returns an array that elements are objects with teams scores', () => {  
      expect(chaiHttpResponse.body[0]).to.have.property('totalPoints');
    });
  })
});