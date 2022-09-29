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

  describe('GET /teams', () => {
    before(async () => {
      chaiHttpResponse = await chai
      .request(app)
      .get('/teams');
    });

    it('returns status code 200', async () => {
      expect(chaiHttpResponse).to.have.status(200);
    });
  
    it('returns an array', async () => {  
      expect(chaiHttpResponse.body).to.be.an('array');
    });

    it('returns an array that elements are objects with table names', async () => {  
      expect(chaiHttpResponse.body[0]).to.have.property('teamName');
    });
  })

});