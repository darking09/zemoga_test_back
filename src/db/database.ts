// Dependencies
import mongoose from "mongoose";
import config from '../config/config';


// make the connection with db with the URL from config
mongoose.connect(config.DB.URL);

const connection = mongoose.connection;

// Check if the connection was succeeded
connection.once('open', async () => {
  console.log('Mongodb connection stablished');
});

// Check if the connection was failed
connection.on('error', err => {
  console.log(err);
  process.exit(0);
});

export async function connectToDatabase() {
  return connection;
}
