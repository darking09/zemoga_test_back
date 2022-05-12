import TwitterWrapper from '../Twitter.Wrapper';

describe('TwitterWrapper unit tests', () => {
  it('Should return a user if the handle is sent it', async () => {
    //Arrange
    const twitterWrapper = new TwitterWrapper();

    //Act
    const twitterUser = await twitterWrapper.getUserByHandle('jack');

    //Assert
    expect(twitterUser.id).not.toBeUndefined;
  })

  it('Should return the user\'s timeline to 12 user', async () => {
    //Arrange
    const twitterUser = {
      id: '12'
    }
    const twitterWrapper = new TwitterWrapper();
    const options = {
      "expansions": ["author_id"],
      "tweet.fields": ['created_at','author_id','conversation_id','public_metrics','context_annotations'],
      "user.fields": ['username'],
      "max_results": 5
    };

    //Act
    const timeline = await twitterWrapper.getUserTimeline(twitterUser, options);

    //Assert
    expect(timeline).toHaveLength(5)
  })
})
