import express from "express";
import handlebars from "express-handlebars";
import path from "path";

import __rootpath from "./rootpath.js";
import startSocketServer from "./socket/socket.js";
import productRouter from "./routers/product.routes.js";
import cartRouter from "./routers/cart.routes.js";
import viewRouter from "./routers/views.routes.js";

/******************************************************************
 * Constants
 ******************************************************************/
const SERVER_PORT = 8080;
const PRODUCTS_PATH = "/api/products/";
const CARTS_PATH = "/api/carts/";
const VIEWS_PATH = "/";

const app = express();

/******************************************************************
 * Middlewares
 ******************************************************************/
app.use(express.json());
app.use(express.static(path.join(__rootpath, "public")));

/******************************************************************
 * Handlebars
 ******************************************************************/
app.engine("handlebars", handlebars.engine());
app.set("views", path.join(__rootpath, "src", "views"));
app.set("view engine", "handlebars");

/******************************************************************
 * Routers
 ******************************************************************/
app.use(PRODUCTS_PATH, productRouter);
app.use(CARTS_PATH, cartRouter);
app.use(VIEWS_PATH, viewRouter);

const httpServer = app.listen(SERVER_PORT, () => {
  console.log(`Server ready on port ${SERVER_PORT}.`);
});

/******************************************************************
 * Socket server - socket.io
 ******************************************************************/
startSocketServer(httpServer);
