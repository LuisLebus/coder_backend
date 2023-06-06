import express from "express";
import productRouter from "./routers/product.routes.js";
import cartRouter from "./routers/cart.routes.js";

/******************************************************************
 * Constants
 ******************************************************************/
const SERVER_PORT = 8080;
const PRODUCTS_PATH = "/api/products/";
const CARTS_PATH = "/api/carts/";

const app = express();

/******************************************************************
 * Middlewares
 ******************************************************************/
app.use(express.json());

/******************************************************************
 * Routers
 ******************************************************************/
app.use(PRODUCTS_PATH, productRouter);
app.use(CARTS_PATH, cartRouter);

app.listen(SERVER_PORT, () => {
  console.log(`Server ready on port ${SERVER_PORT}.`);
});
