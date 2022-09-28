import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import { app } from '../app';
import { Response } from 'superagent';

chai.use(chaiHttp);
const { expect } = chai;

describe('Test login routes', () => {
  let chaiHttpResponse: Response;

  describe('POST /login Valid user', () => {
    
    before(async () => {
      chaiHttpResponse = await chai
      .request(app)
      .post('/login')
      .send({
       email: 'user@user.com',
       password: 'secret_user',
     });
    });

    it('returns status code 200', async () => {
      expect(chaiHttpResponse).to.have.status(200);
    });
  
    it('returns a token', async () => {  
      expect(chaiHttpResponse.body).to.have.property('token');
    });
  })

  describe('POST /login Empty email field', () => {
    
    before(async () => {
      chaiHttpResponse = await chai
      .request(app)
      .post('/login')
      .send({
       email: '',
       password: 'secret_user',
     });
    });

    it('returns status code 400', async () => {
      expect(chaiHttpResponse).to.have.status(400);
    });
  
    it('returns a message', async () => {  
      expect(chaiHttpResponse.body).to.have.property('message');
    });
  })

  describe('POST /login Inexistent user', () => {
    
    before(async () => {
      chaiHttpResponse = await chai
      .request(app)
      .post('/login')
      .send({
       email: 'usuario@user.com',
       password: 'secret_user',
     });
    });

    it('returns status code 401', async () => {
      expect(chaiHttpResponse).to.have.status(401);
    });
    it('returns a message', async () => {  
      expect(chaiHttpResponse.body).to.have.property('message');
    });
  })

  describe('GET /login/validate Valid user', () => {
    
    before(async () => {
      const loginResponse = await chai
      .request(app)
      .get('/login')
      .send({
       email: 'user@user.com',
       password: 'secret_user',
     });

     chaiHttpResponse = await chai
     .request(app)
     .get('/login/validate')
     .set('authorization', loginResponse.body.token);
    });

    it('returns status code 200', async () => {
      expect(chaiHttpResponse).to.have.status(200);
    });
    it('returns logged in role', async () => {  
      expect(chaiHttpResponse.body).to.be.eql({ role: 'user'});
    });
  })

});