import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import User from '../database/models/user';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

describe('Test login route', () => {
  let chaiHttpResponse: Response;

  before(async () => {
    sinon
      .stub(User, "findOne")
      .resolves({ } as User);
  });

  after(()=>{
    (User.findOne as sinon.SinonStub).restore();
  })

  describe('Valid user', () => {
    
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

});