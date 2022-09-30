import { RequestHandler } from 'express';
import AuthenticationError from '../errors/AuthenticationError';
import tokenHelper from '../helpers/token';

const tokenValidation:RequestHandler = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) throw new AuthenticationError('Token not found');
  try {
    const result = tokenHelper.validate(authorization);
    res.locals.email = result.email;
    next();
  } catch (err) {
    throw new AuthenticationError('Token must be a valid token');
  }
};

export default { tokenValidation };
