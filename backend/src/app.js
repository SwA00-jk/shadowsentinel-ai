const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

const scanRoutes = require("./routes/scanRoutes");

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("ShadowSentinel API Running");
  });

  app.use("/api", scanRoutes);
  
module.exports = app;