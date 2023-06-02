import { Router } from "express";
import ProductManager from "../ProductManager.js";

const router = Router();
const productManager = new ProductManager("./db/products.json");

router.get("/", async (req, res) => {
  const limit = Number(req.query.limit);

  const products = await productManager.getProducts();

  if (products) {
    if (limit) {
      res.status(200).json({ status: "success", payload: products.slice(0, limit) });
    } else {
      res.status(200).json({ status: "success", payload: products });
    }
  } else {
    res.status(500).json({ status: "error", error: "Internal Server Error" });
  }
});

router.get("/:id", async (req, res) => {
  const id = Number(req.params.id);

  const product = await productManager.getProductById(id);

  if (product) {
    res.status(200).json({ status: "success", payload: product });
  } else {
    res.status(404).json({ status: "error", error: "Product not found" });
  }
});

router.post("/", async (req, res) => {
  const { title, description, price, thumbnail = [], code, stock, status = true, category } = req.body;

  if (!title || !description || !price || !code || !stock || !category) {
    res.status(400).json({ status: "error", error: "Invalid parameters" });
  } else {
    const result = await productManager.addProduct({
      title,
      description,
      price,
      thumbnail,
      code,
      stock,
      status,
      category,
    });

    if (result) {
      res.status(200).json({ status: "success" });
    } else {
      res.status(500).json({ status: "error", error: "Something went wrong" });
    }
  }
});

router.delete("/:id", async (req, res) => {
  const id = Number(req.params.id);

  const result = await productManager.deleteProduct(id);

  if (result) {
    res.status(200).json({ status: "success" });
  } else {
    res.status(404).json({ status: "error", error: "Product not found" });
  }
});

router.put("/:id", async (req, res) => {
  // console.log(req.body)
  // console.log(req.para)

  const id = Number(req.params.id);
  const product = req.body;

  const result = await productManager.updateProduct(product, id);

  if (result) {
    res.status(200).json({ status: "success" });
  } else {
    res.status(500).json({ status: "error", error: "Something went wrong" });
  }
});

export default router;
