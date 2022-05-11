import './db/database';
import cors from 'cors';
import morgan from 'morgan';
import * as utils from './utils';
import express, { Request, Response } from "express";
import ExpressWrapper from './wrappers/Express.Wrapper';
import UserController from './controllers/User.Controller';

const port = utils.server.getPortNumber();

const middlewares = [
  cors(),
  morgan('dev'),
  express.urlencoded({extended: false}),
  express.json()
];

const server = new ExpressWrapper(port, express);
const userController = new UserController();

server.loadMiddlewares(middlewares);

server.get('/', (req: Request, res: Response) => {
  return res.status(200).send('Zemoga Test Backend');
}).get('/api/user/:searching_parameter', async (req: Request, res: Response) => {
  const twitterUser = await userController.getUser(req.params.searching_parameter);
  return res.status(200).json(twitterUser);
}).post('/api/user', async (req: Request, res: Response) => {
  const {handle = '', name = '', experience = ''} = req.body;
  const twitterUser = await userController.addOrUpdateUser(handle, name, experience);
  return res.status(200).json(twitterUser);
}).run();
