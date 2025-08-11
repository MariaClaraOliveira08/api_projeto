const express = require("express");
const cors = require("cors");
require("dotenv-safe").config();
const jwt = require("jsonwebtoken");
const testConnect = require("./db/testConnect");

class AppController {
  constructor() {
    this.express = express();
    this.middlewares();
    this.routes();
    testConnect();
  }

  middlewares() {
    const corsOptions = {
      origin: "*", // Você pode substituir por um domínio específico depois
      methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE"],
      credentials: true,
      optionsSuccessStatus: 204,
    };
    this.express.use(express.json());
    this.express.use(cors(corsOptions));
  }

  routes() {
    const apiRoutes = require("./routes/apiRoutes");
    this.express.use("/projeto_final", apiRoutes);
  }
}

module.exports = new AppController().express;
