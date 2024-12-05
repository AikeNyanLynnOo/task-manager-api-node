require("dotenv").config();
var cors = require("cors");
const express = require("express");
const { connectToMongoDB } = require("./src/config/connect");
const taskRoutes = require("./src/routes/taskRoutes");
const app = express();
const PORT = process.env.PORT || 8001;
app.use(cors());

const MONGO_URL = process.env.MONGO_URL;
console.log("URL is>>", MONGO_URL);

connectToMongoDB(MONGO_URL)
  .then(() => console.log("Mongodb connected"))
  .catch((e) => {
    console.log("Connect Error>>", e);
  });

app.use(express.json());

app.use("/api", taskRoutes);

app.listen(PORT, () => console.log(`Server Started at PORT:${PORT}`));
