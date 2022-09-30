import { ErrorRequestHandler } from 'express';

const errorMiddleware: ErrorRequestHandler = (err, _req, res, next) => {
  const { status, message } = err;
  console.error(err);
  res.status(status).json({ message });
  next();
};

export default errorMiddleware;
