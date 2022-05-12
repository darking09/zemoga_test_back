import mongoose from "mongoose";
import config from './config/config';
import { APIGatewayProxyHandler } from "aws-lambda";
import UserController from './controllers/User.Controller';
import { response } from "express";

let cachedDB : any = null;

async function connectToDatabase (uri : string, options = {}) {
  if (!cachedDB) {
    cachedDB = await mongoose.connect(uri);
  }
}

export const handler : APIGatewayProxyHandler = async (event) => {
  const context : any = event.requestContext;
  const method : string = context.http.method as string;

  try {
    await connectToDatabase(config.DB.URL);
    const userController = new UserController();
    let response : any;

    if (method === 'GET') {
      const user_id : string | undefined = event?.pathParameters?.user_id;

      const twitterUser = await userController.getUser(user_id);

      if (twitterUser === null) {
        throw "Not user found";
      }

      response = {
        statusCode: 200,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Headers" : "Content-Type",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "POST,GET"
        },
        body: JSON.stringify(twitterUser)
      };
    }

    if (method === 'POST') {
      const {handle = '', name = '', experience = ''} = JSON.parse(event.body as string) as any;
      const twitterUser = await userController.addOrUpdateUser(handle, name, experience);

      if (twitterUser === null) {
        throw "User couldn't be updating";
      }

      response = {
        statusCode: 200,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Headers" : "Content-Type",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "POST,GET"
        },
        body: JSON.stringify(twitterUser)
      };
    }

    return response;
  } catch(e) {
    return {
      statusCode: 400,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Headers" : "Content-Type",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST,GET"
      },
      body: JSON.stringify({message: e})
    };
  }
};
