import {Client} from 'twitter-api-sdk';
import config from "../config/config";

class TwitterWrapper {

  client;

  constructor() {
    this.client = new Client(config.TWITTER);
  }

  async searchUserByHandle(handle:string) : Promise<any> {
    const user = await this.client.users.findUserByUsername(handle);
    return user.data;
  }

  async userTimeline(twitterUser:any, options : any) : Promise<Array<any>> {
    const timeline = await this.client.tweets.usersIdTweets(twitterUser.id,
      options
    );

    return timeline.data as Array<any>;
  }
}


export default TwitterWrapper;
