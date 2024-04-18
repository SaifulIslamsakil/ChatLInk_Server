const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const http = require('http'); // Import http module
const socketIo = require('socket.io'); // Import Socket.IO module
const { MongoClient, ServerApiVersion } = require('mongodb');


const app = express();
const PORT = process.env.PORT || 5000;
dotenv.config();
app.use(express.json());
app.use(cors());

const server = http.createServer(app); // Create an HTTP server
const io = socketIo(server); // Attach Socket.IO to the HTTP server

io.on('connection', (socket) => {
  console.log('A user connected');

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

const uri = "mongodb+srv://Chat_Link:zzUDTpk5EvbtvHxB@chat.ps2jwrd.mongodb.net/?retryWrites=true&w=majority&appName=Chat";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    await client.connect();
    const useCollection = client.db("ChatLink").collection("user")

    app.post("/user", async (req, res) => {
      const body = req.body
      const result = await useCollection.insertOne(body)
      res.send(result)
    })
    app.get("/user", async (req, res) => {
      const result = await useCollection.find().toArray()
      res.send(result)
    })
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // await client.close();
  }
}
run().catch(console.dir);


app.get("/", async (req, res) => {
  res.send("hello world")
})

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

