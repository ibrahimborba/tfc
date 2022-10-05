import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import { app } from '../app';
import { Response } from 'superagent';
import User from '../database/models/user';
import * as UserMock from './mocks/User.json';

chai.use(chaiHttp);
const { expect } = chai;

describe('Test login routes', () => {
  let chaiHttpResponse: Response;

  describe('Success cases', () => {
    before(() => {
      sinon.stub(User, 'findOne').resolves(UserMock as User)
    });
  
    after(() => { sinon.restore(); });

    describe('POST /login valid user', () => {
    
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

    describe('GET /login/validate valid user', () => {
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
        let validateResponse = await chai
        .request(app)
        .get('/login/validate')
        .set('authorization', chaiHttpResponse.body.token);
  
        expect(validateResponse).to.have.status(200);
      });
    
      it('returns a token', async () => {  
        let validateResponse = await chai
        .request(app)
        .get('/login/validate')
        .set('authorization', chaiHttpResponse.body.token);
        
        expect(validateResponse.body).to.have.property('role');
      });
    })

  })

  describe('Error cases', () => {
    before(() => {
      sinon.stub(User, 'findOne').resolves(null)
    });
  
    after(() => { sinon.restore(); });

    describe('POST /login empty email field', () => {
    
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
  
    describe('POST /login inexistent user', () => {
      
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
  
    describe('GET /login/validate without token', () => {
      before(async () => {
        chaiHttpResponse = await chai
        .request(app)
        .get('/login/validate')
        .set('authorization', '');
      });
  
      it('returns status code 401', async () => {
        expect(chaiHttpResponse).to.have.status(401);
      });
    
      it('returns a message', async () => {  
        expect(chaiHttpResponse.body).to.have.property('message');
      });
    })
  
    describe('GET /login/validate with invalid token', () => {
      before(async () => {
        chaiHttpResponse = await chai
        .request(app)
        .get('/login/validate')
        .set('authorization', 'invalidtoken');
      });
  
      it('returns status code 401', async () => {
        expect(chaiHttpResponse).to.have.status(401);
      });
    
      it('returns a message', async () => {  
        expect(chaiHttpResponse.body).to.have.property('message');
      });
    })

  })
});