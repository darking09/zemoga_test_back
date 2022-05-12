import {model, Schema} from 'mongoose';
import IUser from '../types/User';

const userSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  experience: {
    type: String,
    required: true
  },
  picture: {
    type: String,
    required: true
  },
  twitterHandle: {
    type: String,
    unique: true,
    required: true,
    index: true,
    lowercase: true,
    trim: true
  },
  tweets: [
    {
      picture: {
        type: String,
        required: true
      },
      name: {
        type: String,
        required: true
      },
      handle: {
        type: String,
        required: true,
        index: true,
        lowercase: true,
        trim: true
      },
      content: {
        type: String,
        required: true
      }
    }
  ]
});

export default model<IUser>('user', userSchema);
