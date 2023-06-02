import express from "express";
import productRouter from "./routers/product.routes.js";

/******************************************************************
 * Constants
 ******************************************************************/
const SERVER_PORT = 8080;
const PRODUCTS_PATH = "/api/products/";

const app = express();

/******************************************************************
 * Middlewares
 ******************************************************************/
app.use(express.json());

/******************************************************************
 * Routers
 ******************************************************************/
app.use(PRODUCTS_PATH, productRouter);

app.listen(SERVER_PORT, () => {
  console.log(`Server ready on port ${SERVER_PORT}.`);
});
