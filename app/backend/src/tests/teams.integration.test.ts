import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import { app } from '../app';
import { Response } from 'superagent';
import Team from '../database/models/team';
import * as TeamsMock from './mocks/Teams.json';
import * as OneTeamMock from './mocks/OneTeam.json';

chai.use(chaiHttp);
const { expect } = chai;

describe('Test teams routes', () => {
  let chaiHttpResponse: Response;

  before(() => {
    sinon.stub(Team, 'findAll').resolves(TeamsMock as Team[]);
    sinon.stub(Team, 'findByPk').resolves(OneTeamMock as Team);
  });

  after(() => { sinon.restore(); });

  describe('GET /teams', () => {
    before(async () => {
      chaiHttpResponse = await chai
      .request(app)
      .get('/teams');
    });

    it('returns status code 200', async () => {
      expect(chaiHttpResponse).to.have.status(200);
    });
  
    it('returns an array of teams', async () => {  
      expect(chaiHttpResponse.body).to.be.deep.equal(TeamsMock);
    });
  })

  describe('GET /teams/:id', () => {
    before(async () => {
      chaiHttpResponse = await chai
      .request(app)
      .get('/teams/1');
    });

    it('returns status code 200', async () => {
      expect(chaiHttpResponse).to.have.status(200);
    });

    it('returns an object with team names', async () => {  
      expect(chaiHttpResponse.body).to.be.deep.equal(OneTeamMock);
    });
  })

});