import { NextFunction, Request, Response } from 'express';
import * as sinon from 'sinon';
import * as chai from 'chai'; 
import errorMiddleware from '../middlewares/error.middleware';
import ValidationError from '../errors/ValidationError';

const { expect } = chai;

describe('Error middleware', function () {
  const req = {} as Request;
  const res = {} as Response;
  let next: NextFunction;

  before(() => {
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
  });

  after(() => { sinon.restore(); });

  it('error without status code return status 500', () => {
    const error500 = new Error('Error without status');
    errorMiddleware(error500, req, res, next);
    expect((res.status as sinon.SinonStub).calledWith(500)).to.be.equal(true);
  });

  it('error with status code return status', () => {
    const error500 = new ValidationError(400, 'Error with status');
    errorMiddleware(error500, req, res, next);
    expect((res.status as sinon.SinonStub).calledWith(400)).to.be.equal(true);
  });

  it('returns error messsage', () => {
    const error500 = new Error('Error without status');
    errorMiddleware(error500, req, res, next);
    expect((res.json as sinon.SinonStub)
      .calledWith({ message:'Error with status' })).to.be.equal(true);
  });

});