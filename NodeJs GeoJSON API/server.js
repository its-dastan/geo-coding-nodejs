const express = require("express");
const path = require("path");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");

// load env vars
dotenv.config({ path: "./config/config.env" });

// connect to database
connectDB();

const app = express();

// body parser
app.use(express.json());

// enable cors
app.use(cors());

// set static folder
app.use(express.static(path.join(__dirname, "public")));

// routes
app.get("/", (req, res) => {
  res.send("hello!");
});

app.use("/api/stores", require("./routes/stores"));

// Starting server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
