import {Document} from 'mongoose';

import ITweet from './Tweet';

// User interface
interface IUser extends Document {
  name: string;
  experience: string;
  picture: string;
  twitterHandle: string;
  tweets?: Array<ITweet>;
}

export default IUser;
