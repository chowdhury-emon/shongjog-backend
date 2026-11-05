import express from 'express';
import 'dotenv/config';
import cors from 'cors';
import { MongoClient } from 'mongodb';

const app = express();
const port = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());


// MONGODB CONNECTION
const client = new MongoClient(process.env.MONGODB_URI);
let eventCollection;
export async function connectToMongoDB() {
  try {
    await client.connect();
    console.log("You successfully connected to MongoDB!");
    const db = client.db("shongjog");
    eventCollection = db.collection("events");

    return client;
  } catch (err) {
    console.dir(err);
  }
}
connectToMongoDB();


// ALL THE ROUTES
// app.get('/', (req, res) => {
//   res.send("I'm Working")
// });

app.get('/events', async (req, res) => {
  const data = await eventCollection.find({}).toArray();
  res.send(data);
});

// http://localhost:5000/events/create
app.post('/events/create', async (req, res) => {
  const data = req.body;
  console.log(data)
  const result = await eventCollection.insertOne({ data });
  res.send(result);
});


app.listen(port, () => {
  console.log("Server running on port: ", port)
});



// [
//   {
//     "title": "Winter Clothes Distribution",
//     "description": "Distribute warm clothes and blankets among underprivileged families during winter.",
//     "eventType": "Donation",
//     "thumbnailUrl": "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c",
//     "location": "Mirpur 10, Dhaka",
//     "eventDate": "2026-12-15T09:00:00.000Z",
//     "creatorEmail": "emonc.dev@gmail.com"
//   },
//   {
//     "title": "Green Dhaka Plantation Drive",
//     "description": "Plant trees in public spaces to promote a greener and healthier environment.",
//     "eventType": "Plantation",
//     "thumbnailUrl": "https://images.unsplash.com/photo-1416879595882-3373a0480b5b",
//     "location": "Dhanmondi Lake, Dhaka",
//     "eventDate": "2026-12-20T07:00:00.000Z",
//     "creatorEmail": "emonc.dev@gmail.com"
//   },
//   {
//     "title": "Community Park Cleanup",
//     "description": "Volunteers will clean the park and remove plastic waste to improve the local environment.",
//     "eventType": "Cleanup",
//     "thumbnailUrl": "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b",
//     "location": "Uttara Sector 7, Dhaka",
//     "eventDate": "2026-12-25T08:00:00.000Z",
//     "creatorEmail": "emonc.dev@gmail.com"
//   },
//   {
//     "title": "Free Education for Children",
//     "description": "Arrange a free educational workshop and distribute learning materials to disadvantaged children.",
//     "eventType": "Education",
//     "thumbnailUrl": "https://images.unsplash.com/photo-1509062522246-3755977927d7",
//     "location": "Mohammadpur, Dhaka",
//     "eventDate": "2027-01-05T10:00:00.000Z",
//     "creatorEmail": "emonc.dev@gmail.com"
//   },
//   {
//     "title": "Free Health Checkup Camp",
//     "description": "Organize free health checkups and basic medical consultations for local residents.",
//     "eventType": "Healthcare",
//     "thumbnailUrl": "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d",
//     "location": "Uttara, Dhaka",
//     "eventDate": "2027-01-10T08:30:00.000Z",
//     "creatorEmail": "emonc.dev@gmail.com"
//   },
//   {
//     "title": "Food Distribution for the Needy",
//     "description": "Prepare and distribute nutritious meals to homeless people and low-income families.",
//     "eventType": "Donation",
//     "thumbnailUrl": "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c",
//     "location": "Sadarghat, Dhaka",
//     "eventDate": "2027-01-15T09:00:00.000Z",
//     "creatorEmail": "emonc.dev@gmail.com"
//   }
// ]
