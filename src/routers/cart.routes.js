import { Router } from "express";
import path from "path";

import CartManager from "../CartManager.js";
import __rootpath from "../rootpath.js";

const router = Router();
const cartManager = new CartManager(path.join(__rootpath, "db", "carts.json"));

router.post("/", (req, res) => {
  const result = cartManager.createCart();
  if (result) {
    res.status(200).json({ status: "success" });
  } else {
    res.status(500).json({ status: "error", error: "Something went wrong" });
  }
});

router.get("/:cid", async (req, res) => {
  const cid = Number(req.params.cid);

  const cart = await cartManager.getCartById(cid);

  if (cart) {
    res.status(200).json({ status: "success", payload: cart });
  } else {
    res.status(404).json({ status: "error", error: "Cart not found" });
  }
});

router.post("/:cid/product/:pid", (req, res) => {
  const cid = Number(req.params.cid);
  const pid = Number(req.params.pid);

  const result = cartManager.addProductToCart(cid, pid);

  if (result) {
    res.status(200).json({ status: "success" });
  } else {
    res.status(500).json({ status: "error", error: "Something went wrong" });
  }
});

export default router;
