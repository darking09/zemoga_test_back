import UserController from "../User.Controller";
import db from '../../db/databaseUnitTest';

beforeAll(async () => await db.startConnection());

afterEach(async () => await db.clearDatabase());

afterAll(async () => await db.closeDatabase());

let userController : any;

describe("UserController", () => {
  beforeEach(() => {
    userController = new UserController();
  })

  it("Should save a new user with twitter data", async () => {
    //Arrange
    const name = 'Jon Snow';
    const handle = 'jack';
    const experience = 'Bastard of Lord Eddard Stark ...';

    //Act
    const user = await userController.addOrUpdateUser(handle, name, experience)

    //Assert
    expect(user.name).toEqual(name)
    expect(user.twitterHandle).toEqual(handle)
    expect(user.experience).toEqual(experience)
    expect(user.picture).not.toEqual('')
    expect(user.tweets).toHaveLength(5)
    expect(user._id).not.toBeUndefined
  })

  it("Should update user name without changing any other attribute", async () => {
    //Arrange
    const name = 'Jon Snow';
    const nameToBeUpdating = 'Jon Snow 2';
    const handle = 'jack';
    const experience = 'Bastard of Lord Eddard Stark ...';
    await userController.addOrUpdateUser(handle, name, experience)

    //Act
    const updatedUser = await userController.addOrUpdateUser('', nameToBeUpdating);

    //Assert
    expect(updatedUser.name).toEqual(nameToBeUpdating)
    expect(updatedUser.twitterHandle).toEqual(handle)
    expect(updatedUser.experience).toEqual(experience)
  })

  it("Should get a user by id", async () => {
    //Arrange
    const name = 'Jon Snow';
    const handle = 'jack';
    const experience = 'Bastard of Lord Eddard Stark ...';
    const user = await userController.addOrUpdateUser(handle, name, experience)

    //Act
    const foundUser = await userController.getUser(user._id);

    //Assert
    expect(foundUser.name).toEqual(name)
    expect(foundUser.twitterHandle).toEqual(handle)
    expect(foundUser.experience).toEqual(experience)
  })

  it("Should get a user by handle", async () => {
    //Arrange
    const name = 'Jon Snow';
    const handle = 'jack';
    const experience = 'Bastard of Lord Eddard Stark ...';
    await userController.addOrUpdateUser(handle, name, experience)

    //Act
    const foundUser = await userController.getUser(handle);

    //Assert
    expect(foundUser.name).toEqual(name)
    expect(foundUser.twitterHandle).toEqual(handle)
    expect(foundUser.experience).toEqual(experience)
  })
})
