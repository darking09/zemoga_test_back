import UserRepository from "../User.Repository";
import db from '../../db/databaseUnitTest';

beforeAll(async () => await db.startConnection());

afterEach(async () => await db.clearDatabase());

afterAll(async () => await db.closeDatabase());

let userRepository : any;

describe("UserRepository", () => {
  beforeEach(async()=> {
    userRepository = new UserRepository();
  })

  it("Should save a new user into the database and search it by handle", async () => {
    //Arrange
    const handle = 'kingInTheNorth';
    userRepository.setName('Jon Snow');
    userRepository.setExperience('Bastard of Lord Eddard Stark ...');
    userRepository.setPicture('https://me.com/me.jpg');
    userRepository.setTwitterHandle('kingInTheNorth');
    userRepository.setTweets([]);

    //Act
    await userRepository.saveOrUpdate();
    const user = await userRepository.findOne({twitterHandle: handle})

    //Assert
    expect(user).not.toBeNull
  })

  it("Should save a new user into the database and search it by id", async () => {
    //Arrange
    const handle = 'kingInTheNorth';
    userRepository.setName('Jon Snow');
    userRepository.setExperience('Bastard of Lord Eddard Stark ...');
    userRepository.setPicture('https://me.com/me.jpg');
    userRepository.setTwitterHandle('kingInTheNorth');
    userRepository.setTweets([]);

    //Act
    const newUser = await userRepository.saveOrUpdate();
    const foundUser = await userRepository.findById(newUser._id)

    //Assert
    expect(foundUser).not.toBeNull
  })

  it("Should save a new user into the database and search it by id", async () => {
    //Arrange
    const handle = 'kingInTheNorth';
    userRepository.setName('Jon Snow');
    userRepository.setExperience('Bastard of Lord Eddard Stark ...');
    userRepository.setPicture('https://me.com/me.jpg');
    userRepository.setTwitterHandle('kingInTheNorth');
    userRepository.setTweets([]);

    //Act
    const newUser = await userRepository.saveOrUpdate();
    const foundUser = await userRepository.findById(newUser._id)

    //Assert
    expect(foundUser).not.toBeNull
  })

  it("Should update a user before it was saved", async () => {
    //Arrange
    const handle = 'kingInTheNorth';
    const newName = 'Jon Snow 2';
    userRepository.setName('Jon Snow');
    userRepository.setExperience('Bastard of Lord Eddard Stark ...');
    userRepository.setPicture('https://me.com/me.jpg');
    userRepository.setTwitterHandle('kingInTheNorth');
    userRepository.setTweets([]);
    await userRepository.saveOrUpdate();
    userRepository.setName(newName);
    await userRepository.saveOrUpdate();

    //Act
    const user = await userRepository.findOne({twitterHandle: handle})

    //Assert
    expect(user.name).toEqual(newName)
  })
});
