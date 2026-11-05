import { MongoClient } from 'mongodb';

const client = new MongoClient("mongodb://<db_username>:uCiLGEE9kRXhc1Rc@ac-5yofsq9-shard-00-00.niwnksk.mongodb.net:27017,ac-5yofsq9-shard-00-01.niwnksk.mongodb.net:27017,ac-5yofsq9-shard-00-02.niwnksk.mongodb.net:27017/?ssl=true&replicaSet=atlas-35z9w7-shard-0&authSource=admin");

export async function connectToMongoDB() {
  try {
    await client.connect();
    console.log("You successfully connected to MongoDB!");
    return client;
  } catch (err) {
    console.dir(err);
  }
}
connectToMongoDB();
const db = client.db("shongjog");


// Call this only when your application terminates
export async function disconnectFromMongoDB() {
  await client.close();
}

