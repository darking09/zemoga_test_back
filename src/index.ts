import './db/database';
import cors from 'cors';
import morgan from 'morgan';
import * as utils from './utils';
import express, { Request, Response } from "express";
import ExpressWrapper from './wrappers/Express.Wrapper';

const port = utils.server.getPortNumber();

const middlewares = [
  cors(),
  morgan('dev'),
  express.urlencoded({extended: false}),
  express.json()
];

const server = new ExpressWrapper(port, express);

server.loadMiddlewares(middlewares);

server.get('/', (req: Request, res: Response) => {
  return res.status(200).send('Zeomoga Test Backend');
}).run();
