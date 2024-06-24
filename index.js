const express = require("express");
const mongoose = require("mongoose");
const Product = require("./models/product.model.js");
const User = require("./models/users.model.js");
const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("hello from node api server");
});

// Create a product
app.post("/api/products", async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// read all products
app.get("/api/products", async (req, res) => {
  try {
    const products = await Product.find({});
    res.status(200).json(products);
  } catch {
    res.status(500).json({ message: error.message });
  }
});

// read one specific product with ID
app.get("/api/products/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update API
app.put("/api/products/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByIdAndUpdate(id, req.body);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json(200);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete a Product

app.delete("/api/product/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const product = await Product.findByIdAndDelete(id);

    if (!product) {
      res.status(404).json({ message: "there is no product" });
    }

    res.status(200).json({ message: "product deleted succsesfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
// -------------------------------- USERS -----------

// Create a user
app.post("/api/user", async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// read all users
app.get("/api/users", async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).json(users);
  } catch {
    res.status(500).json({ message: error.message });
  }
});

// read one specific product with ID
app.get("/api/users/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update API
app.put("/api/users/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByIdAndUpdate(id, req.body);

    if (!user) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json(200);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.delete("/api/users/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findByIdAndDelete(id);

    if (!user) {
      res.status(404).json({ message: "there is no product" });
    }

    res.status(200).json({ message: "user deleted succsesfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

mongoose
  .connect(
    "mongodb+srv://admin:levandeviko@autoshop-api.n70qdic.mongodb.net/autoshop-api?retryWrites=true&w=majority&appName=AutoShop-API"
  )
  .then(() => {
    console.log("Connected to db!");
    app.listen(3000, () => {
      console.log("Server is running on port 3000");
    });
  })
  .catch(() => {
    console.log("connection failed");
  });
