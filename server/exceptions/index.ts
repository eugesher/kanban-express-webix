import { ErrorRequestHandler, NextFunction, Request, Response } from 'express';

import IError from '../types/interfaces/error.interface';

const index: ErrorRequestHandler = (
  err: IError,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { statusCode = 500, message } = err;

  res.status(statusCode).send({
    message: statusCode === 500 ? 'internal server error' : message,
  });

  next();
};

export default index;
