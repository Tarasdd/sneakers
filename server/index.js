"use strict";

const express = require("express");

const cors = require("cors");

const { MongoClient } = require("mongodb");

const client = new MongoClient(
  "mongodb+srv://stefik:poppen_23@cart.05comij.mongodb.net/Sneakers?retryWrites=true&w=majority"
);

const app = express();

app.use(cors());
app.use(express.json());

app.get("/getCart", async (req, res) => {
  try {
    const data = await client.db().collection("Cart").find({}).toArray();

    res.status(200).json(data);
  } catch (error) {
    console.error("Error fetching data from MongoDB:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.post("/addToCart", async (req, res) => {
  try {
    await client.db().collection("Cart").insertOne(req.body);
    res.status(200);
  } catch (error) {
    console.error("Error fetching data from MongoDB:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.delete("/deleteFromCart/:id", async (req, res) => {
  try {
    await client.db().collection("Cart").deleteOne({ _id: req.params.id });
    console.log(`delete ${req.params.id}`);
    res.status(200);
  } catch (error) {
    console.error("Error fetching data from MongoDB:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/getProducts", async (req, res) => {
  try {
    const limit = Number(req.query.limit);
    const page = Number(req.query.page);
    const numberOfSkipped = (page - 1) * limit;
    const data = await client
      .db()
      .collection("Products")
      .find({})
      .skip(numberOfSkipped)
      .limit(limit)
      .toArray();

    res.status(200).json(data);
  } catch (error) {
    console.error("Error fetching data from MongoDB:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/getAllProducts", async (req, res) => {
  try {
    const data = await client
      .db()
      .collection("Products")
      .find({})

      .toArray();

    res.status(200).json(data);
  } catch (error) {
    console.error("Error fetching data from MongoDB:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/getOrders", async (req, res) => {
  try {
    const data = await client.db().collection("Orders").find({}).toArray();

    res.status(200).json(data);
  } catch (error) {
    console.error("Error fetching data from MongoDB:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.post("/addToOrders", async (req, res) => {
  try {
    await client.db().collection("Favorites").insertOne(req.body);
    res.status(200);
  } catch (error) {
    console.error("Error fetching data from MongoDB:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/getFavorites", async (req, res) => {
  try {
    const data = await client.db().collection("Favorites").find({}).toArray();

    res.status(200).json(data);
  } catch (error) {
    console.error("Error fetching data from MongoDB:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.post("/addToFavorites", async (req, res) => {
  try {
    await client.db().collection("Favorites").insertOne(req.body);
    res.status(200);
  } catch (error) {
    console.error("Error fetching data from MongoDB:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.delete("/deleteFromFavorites/:id", async (req, res) => {
  try {
    await client.db().collection("Favorites").deleteOne({ _id: req.params.id });

    res.status(200);
  } catch (error) {
    console.error("Error fetching data from MongoDB:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
