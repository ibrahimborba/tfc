import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import { app } from '../app';
import { Response } from 'superagent';
import { response } from 'express';

chai.use(chaiHttp);
const { expect } = chai;

describe('Test teams routes', () => {
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

});