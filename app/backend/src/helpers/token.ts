import * as jwt from 'jsonwebtoken';
import { JwtPayload, SignOptions } from 'jsonwebtoken';
import IPayload from '../interfaces/IPayload';

const JWT_SECRET = process.env.JWT_SECRET || 'jwt_secret';
const JWT_OPTIONS: SignOptions = { algorithm: 'HS256', expiresIn: '1d' };

const create = (payload: IPayload) => {
  const token = jwt.sign(payload, JWT_SECRET, JWT_OPTIONS);
  return token;
};

const validate = (token: string): JwtPayload => {
  const decoded = jwt.verify(token, JWT_SECRET);
  return decoded as JwtPayload;
};

export default { create, validate };
