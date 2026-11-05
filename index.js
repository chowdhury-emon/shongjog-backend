import express from 'express';
import 'dotenv/config';
import cors from 'cors';
import { MongoClient } from 'mongodb';

const app = express();
const port = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());

const client = new MongoClient(process.env.MONGODB_URI);

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

app.get('/', (req, res) => {
  res.send("I'm Working")
});

app.listen(port, () => {
  console.log("Server running on port: ", port)
})