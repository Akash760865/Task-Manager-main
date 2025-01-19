require('dotenv').config(); // Make sure this is at the top of the file
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");
const taskRoutes = require("./routes/taskRoutes");
const profileRoutes = require("./routes/profileRoutes");

app.use(express.json());
app.use(cors());

const mongoUrl = process.env.MONGODB_URL;
mongoose.connect(mongoUrl, err => {
  if (err) throw err;
  console.log("Mongodb connected...");
});

app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/profile", profileRoutes);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.resolve(__dirname, "../frontend/build")));
  app.get("*", (req, res) => res.sendFile(path.resolve(__dirname, "../frontend/build/index.html")));
}

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Backend is running on port ${port}`);
});



// import express from 'express';
// import dotenv from 'dotenv';
// import cors from 'cors';
// import bodyParser from 'body-parser';

// //components
// import Connection from './database/db.js';
// import Router from './routes/route.js';


// dotenv.config();

// const app = express();

// app.use(cors());
// app.use(bodyParser.json({ extended: true }));
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use('/', Router);


// const PORT = 8000;
// const username = process.env.DB_USERNAME;
// const password = process.env.DB_PASSWORD;

// Connection(username, password);

// app.listen(PORT, () => console.log(⁠ Server is running successfully on PORT ${PORT} ⁠));
