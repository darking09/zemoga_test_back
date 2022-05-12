// Dependecies
import db from '../../db/databaseUnitTest';
import IUser from '../../types/User';
import ITweet from '../../types/Tweet';
import User from '../users.models';

beforeAll(async () => await db.startConnection());

afterEach(async () => await db.clearDatabase());

afterAll(async () => await db.closeDatabase());

describe('User Model', () => {
  it('Should save a user', async () => {
    //Arrange
    const userComplete = makeUser();

    //Act
    const userMongo : IUser= await User.create(userComplete);

    //Assert
    expect(userMongo._id).not.toBeUndefined();
  });

  it('Should find out a user', async () => {
    //Arrange
    const userComplete = makeUser();
    await User.create(userComplete);

    //Act
    const users : Array<IUser> = await User.find({
      twitterHandle: userComplete.twitterHandle
    });

    //Assert
    expect(users.length).toEqual(1);
  });

  it('Should update a user', async () => {
    //Arrange
    const newImage : string = 'https://me.img/neww_me.jpg';
    const userComplete = makeUser();
    const user = new User(userComplete);
    await user.save();
    user.picture = newImage;
    await user.save();

    //Act
    const updatedUser : Array<IUser> = await User.find({
      twitterHandle: userComplete.twitterHandle
    });

    //Assert
    expect(updatedUser[0].picture).toEqual(newImage);
  });

  it('Should delete a user', async () => {
    //Arrange
    const userComplete = makeUser();
    const user = new User(userComplete);
    await user.save();
    await User.deleteOne({
      twitterHandle: userComplete.twitterHandle
    });

    //Act
    const updatedUser : Array<IUser> = await User.find({
      twitterHandle: userComplete.twitterHandle
    });

    //Assert
    expect(updatedUser.length).toEqual(0);
  });
});


function makeUser(){
  return {
    name: 'John Snow',
    experience: 'Some text here ...',
    picture: 'https://me.img/me.jpg',
    twitterHandle: '@kingInTheNorth',
    tweets : [
      {
        picture: 'https://me.img/me.jpg',
        name:'One',
        handle: '@me1Handle',
        content: 'My content 1 ...'
      },
      {
        picture: 'https://me.img/me2.jpg',
        name:'Two',
        handle: '@me2Handle',
        content: 'My content 2 ...'
      },
      {
        picture: 'https://me.img/me3.jpg',
        name:'Three',
        handle: '@me3Handle',
        content: 'My content 3 ...'
      }
    ]
  }
}
