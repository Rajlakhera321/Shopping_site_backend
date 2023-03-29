require("dotenv").config();
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const routes = require("./src/router");
const mongoose = require("mongoose");
const http = require("http");
const cors = require("cors");
app.use(cors());

(async () => {
  try {
    await mongoose.connect(process.env.DB_URL, {});
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    // app.use(express.json());
    app.use("/api/", routes);
    console.log("Successfully connected database");
    const server = http.createServer(app);
    const port = process.env.PORT || 6000;
    server
      .listen(port)
      .on("listening", () => console.log(`App is starting on port: ${port}`))
      .on("error", (err) =>
        console.log(`An error occured while starting server`, err)
      );
  } catch (error) {
    console.log(error);
    console.log(`An error is happening with DB URL connection string`);
    process.exit(1);
  }
})();
