import sanitize from 'mongo-sanitize';
import Users from '../models/users.models';
import IUser from '../types/User';
import ITweet from '../types/Tweet';

class UserRepository {
  private userDao: IUser;
  name = '';
  experience = '';
  picture = '';
  twitterHandle= '';
  tweets: Array<ITweet> = [];

  constructor() {
    this.userDao = new Users();
  }

  async findOne(searchingParameter : any) : Promise<IUser | null> {
    try {
      return await Users.findOne(sanitize(searchingParameter)).exec();
    } catch (e) {
      return null;
    }
  }

  async findById(id : string) : Promise<IUser | null> {
    try {
      return await Users.findById(sanitize(id)).exec();
    } catch (e) {
      return null;
    }
  }

  async saveOrUpdate() : Promise<IUser> {
    this.userDao.name = this.name;
    this.userDao.experience = this.experience;
    this.userDao.picture = this.picture;
    this.userDao.twitterHandle = this.twitterHandle;
    this.userDao.tweets = this.tweets;

    return await this.userDao.save();
  }

  public setName(name:string) {
    if (name !== '') {
      this.name = sanitize(name);
    }
  }

  public setExperience(experience:string) {
    if (experience !== '') {
      this.experience = sanitize(experience);
    }
  }

  public setPicture(picture:string) {
    if (picture !== '') {
      this.picture = sanitize(picture);
    }
  }

  public setTwitterHandle(twitterHandle:string) {
    if (twitterHandle !== '') {
      this.twitterHandle = sanitize(twitterHandle);
    }
  }

  public setTweets(tweets:Array<ITweet>) {
    if (tweets.length > 0) {
      this.tweets = sanitize(tweets);
    }
  }

  public setUser(user:IUser) {
    this.userDao = user;
  }

  public getName() : string {
    return this.name;
  }

  public getExperience() : string {
    return this.experience;
  }

  public getPicture() : string{
    return this.picture;
  }

  public getTwitterHandle() : string {
    return this.twitterHandle;
  }

  public getTweets() : Array<ITweet> {
    return this.tweets;
  }

}

export default UserRepository;
