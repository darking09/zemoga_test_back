import UserRepository from "../repositories/User.Repository";
import TwitterWrapper from "../wrappers/Twitter.Wrapper";
import IUser from '../types/User';
import ITweet from '../types/Tweet';

class UserController {
  userRepository;
  twitterWrapper;
  twitterOptions : any = {
    "expansions": ["author_id"],
    "tweet.fields": ['created_at','author_id'],
    "user.fields": ['username', 'profile_image_url'],
    "media.fields": 'url',
    "max_results": 5
  };

  constructor() {
    this.userRepository = new UserRepository();
    this.twitterWrapper = new TwitterWrapper();
  }

  async addOrUpdateUser(...args : Array<any>) : Promise<IUser> {
    const [
      handle = '',
      name = '',
      experience = ''
    ] = args;

    const twitterUser : IUser | null = await this.getUser(handle);

    if (twitterUser && twitterUser !== null) {
      this.userRepository.setUser(twitterUser);
    }

    this.userRepository.setName(name);
    this.userRepository.setTwitterHandle(handle);
    this.userRepository.setExperience(experience);

    if (!twitterUser || twitterUser === null) {
      const twitterUser = await this.getTwitterUser(handle);
      this.userRepository.setPicture(twitterUser.profile_image_url as string);
      const timeline = await this.getTimeline(twitterUser);
      this.userRepository.setTweets(timeline);
    }

    return await this.userRepository.saveOrUpdate();
  }

  async getUser(parameterOfSerching : string) : Promise<any | null> {
    // Search out the Twitter user by the handle
    let foundTwitterUser = await this.userRepository.findOne({handle: parameterOfSerching});

    if (foundTwitterUser) {
      return foundTwitterUser;
    }

    // Search out the Twitter user by ID
    foundTwitterUser = await this.userRepository.findOne(parameterOfSerching);

    if (foundTwitterUser) {
      return foundTwitterUser;
    }

    return null;
  }

  private async getTimeline(twitterUser : any) : Promise<Array<ITweet>> {
    const tweets = await this.twitterWrapper.getUserTimeline(twitterUser, this.twitterOptions);

    return tweets.map(t => ({
      picture: this.userRepository.getPicture(),
      name: this.userRepository.getName(),
      handle: this.userRepository.getTwitterHandle(),
      content: t.text
    }));
  }

  private async getTwitterUser(handle : string) : Promise<any> {
    return await this.twitterWrapper.getUserByHandle(handle, {'user.fields': ['profile_image_url']});
  }
}

export default UserController;
