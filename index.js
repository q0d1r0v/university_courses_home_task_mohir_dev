const express = require("express");
const swaggerUi = require("swagger-ui-express");
const swaggerJsdoc = require("swagger-jsdoc");
require("dotenv").config();
const { api } = require("./src/api/api");

const PORT = process.env.PORT || 3000;

const server = express();

server.use(express.json());
server.use("/", api);

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "University courses api",
      version: "1.0.0",
      description: "University courses api",
    },
  },
  apis: ["./src/services/*.js"],
};
const swaggerSpec = swaggerJsdoc(swaggerOptions);
server.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

server.listen(PORT, () => {
  console.log("Server is running on port " + PORT);
});
