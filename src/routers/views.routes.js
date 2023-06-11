import { Router } from "express";
import path from "path";

import ProductManager from "../ProductManager.js";
import __rootpath from "../rootpath.js";

const router = Router();
const productManager = new ProductManager(path.join(__rootpath, "db", "products.json"));

router.get("/", async (req, res) => {
  try {
    const products = await productManager.getProducts();

    if (products) {
      res.render("home", { products });
    } else {
      res.render("home", { products: [] });
    }
  } catch (error) {
    res.render("home", { products: [] });
  }
});

export default router;
