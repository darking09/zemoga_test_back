import {Client} from 'twitter-api-sdk';
import config from "../config/config";

class TwitterWrapper {

  client;

  constructor() {
    this.client = new Client(config.TWITTER);
  }

  async getUserByHandle(handle:string, options = {} as any, request_options = {} as any) : Promise<any> {
    const user = await this.client.users.findUserByUsername(handle, options, request_options);
    return user.data;
  }

  async getUserTimeline(twitterUser:any, options = {} as any) : Promise<Array<any>> {
    const timeline = await this.client.tweets.usersIdTweets(twitterUser.id,
      options
    );

    return timeline.data as Array<any>;
  }
}


export default TwitterWrapper;
