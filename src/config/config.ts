// Enviroment Constants
const {
  MONGO_USERNAME,
  MONGO_PASSWORD,
  MONGO_HOSTNAME,
  MONGO_PORT,
  MONGO_DB,
  TWITTER_BEARER_TOKEN,
} = process.env;

export default {
  TWITTER: TWITTER_BEARER_TOKEN as string,
  DB: {
    URL: `mongodb://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_HOSTNAME}:${MONGO_PORT}/${MONGO_DB}?authSource=admin`
  }
};
