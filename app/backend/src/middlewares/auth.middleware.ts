import { RequestHandler } from 'express';
import tokenHelper from '../helpers/token';

const tokenValidation:RequestHandler = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) return res.status(401).json({ message: 'Token not found' });
  try {
    const result = tokenHelper.validate(authorization);
    res.locals.email = result.email;
    next();
  } catch (err) {
    console.error(err);
    return res.status(401).json({ message: 'Token must be a valid token' });
  }
};

export default { tokenValidation };
