const express = require("express");
const cors = require("cors");
require("dotenv-safe").config();
const jwt = require("jsonwebtoken");
const testConnect = require("./db/testConnect");

class AppController {
  constructor() {
    this.express = express();

    // Configuração CORS dentro do index.js
    const corsOptions = {
      origin: "*", // Aqui você pode limitar a origem
      methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE"],
      credentials: true,
      optionsSuccessStatus: 204,
    };

    this.middlewares(corsOptions);
    this.routes();
    testConnect();
  }

  middlewares(corsOptions) {
    this.express.use(express.json());
    this.express.use(cors(corsOptions));
  }

  routes() {
    const apiRoutes = require("./routes/apiRoutes");
    this.express.use("/projeto_final", apiRoutes);
  }
}

module.exports = new AppController().express;
