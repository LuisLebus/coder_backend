import express from "express";
import ProductManager from "./ProductManager.js";

const productManager = new ProductManager("./db/products.json");

const app = express();

app.get("/products", async (req, res) => {
  const limit = Number(req.query.limit);

  const products = await productManager.getProducts();

  if (limit) {
    res.send(products.slice(0, limit));
  } else {
    res.send(products);
  }
});

app.get("/products/:id", async (req, res) => {
  const id = Number(req.params.id);

  const product = await productManager.getProductById(id);

  if (product) {
    res.send(product);
  } else {
    res.send({ error: "Not found" });
  }
});

app.listen(8080, () => {
  console.log("Server ready on port 8080.");
});
