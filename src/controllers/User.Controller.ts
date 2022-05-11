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
    "user.fields": ['username'],
    "media.fields": 'url',
    "max_results": 5
  };

  constructor() {
    this.userRepository = new UserRepository();
    this.twitterWrapper = new TwitterWrapper();
  }

  async addOrUpdateUser(...args : Array<any>) : Promise<IUser> {
    const [
      handle,
      name,
      experience
    ] = args;

    const twitterUser : IUser | null= await this.getUser(handle);

    if (twitterUser) {
      this.userRepository.setUser(twitterUser);
    }

    if (!twitterUser) {
      await this.searchUserTweets(handle);
    }

    this.userRepository.setName(name);
    this.userRepository.setTwitterHandle(handle);
    this.userRepository.setExperience(experience);

    return await this.userRepository.saveOrUpdate();
  }

  async getUser(parameterOfSerching : string) : Promise<any | null> {
    const tUserFindOne = await this.userRepository.findOne({handle: parameterOfSerching});

    if (tUserFindOne) {
      return tUserFindOne;
    }

    const tUserFindById = await this.userRepository.findOne(parameterOfSerching);

    if (tUserFindById) {
      return tUserFindById;
    }

    return null;
  }

  private async searchUserTweets(handle : string) : Promise<void> {
    const twitterUser = await this.searchUser(handle);

    const tweets = await this.twitterWrapper.userTimeline(twitterUser, this.twitterOptions);

    this.userRepository.setTweets(tweets.map(t => ({
      picture: '',
      name: '',
      handle: '',
      content: t.text
    })));
  }

  private async searchUser(handle : string): Promise<any> {
    const twitterUser = await this.twitterWrapper.searchUserByHandle(handle);

    this.userRepository.setPicture(twitterUser.profile_image_url);

    return twitterUser;
  }
}

export default UserController;
