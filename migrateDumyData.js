require('dotenv').config();
const { MongoClient } = require("mongodb");
const { fetchData } = require("./data/dumy");

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);

async function migrateData({ DatabaseName, CollectionName }) {
  try {
    await client.connect();
    console.log("Connected to MongoDB");
    const db = client.db(DatabaseName);
    const collection = db.collection(CollectionName);
    await collection.deleteMany({});
    console.log("Cleared existing Data");
    const data = await fetchData();
    const result = await collection.insertMany(data);
    console.log(`Successfully inserted ${result.insertedCount}`);
    const count = await collection.countDocuments();
    console.log("Total data in database:", count);
  } catch (err) {
    console.error("Migration error:", err);
  } finally {
    await client.close();
    console.log("Connection closed");
  }
}

migrateData({
  DatabaseName: "EgyptianLeagueManagement",
  CollectionName: "matches",
});
