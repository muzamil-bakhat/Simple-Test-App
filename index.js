const express = require("express");
const MongoClient = require("mongodb").MongoClient;

const app = express();
const PORT = 5051;
const MONGO_URL = "mongodb://admin:qwerty@localhost:27017";
const client = new MongoClient(MONGO_URL); // Create a single client instance

app.use(express.urlencoded({ extended: true }));
app.use(express.json()); // Important for handling JSON requests
app.use(express.static("public"));

// GET request - Fetch all users
app.get("/getUser", async (req, res) => {
  try {
    await client.connect();
    console.log("Connected successfully to MongoDB");
    
    const db = client.db("docker-connected-db");
    const users = await db.collection("user").find({}).toArray();
    
    res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ message: "Internal Server Error" });
  } finally {
    await client.close(); // Close connection properly
  }
});

// POST request - Add a user
app.post("/addUser", async (req, res) => {
  try {
    await client.connect();
    console.log("Connected successfully to MongoDB");

    const db = client.db("docker-connected-db");
    const userObj = req.body;

    const result = await db.collection("user").insertOne(userObj);
    console.log("Data inserted in DB:", result);

    res.status(201).json({ message: "User added successfully", userId: result.insertedId });
  } catch (error) {
    console.error("Error inserting data:", error);
    res.status(500).json({ message: "Internal Server Error" });
  } finally {
    await client.close(); // Ensure the connection is closed
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
});
