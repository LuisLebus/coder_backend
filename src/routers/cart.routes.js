import { Router } from "express";
import CartManager from "../CartManager.js";

const router = Router();
const cartManager = new CartManager("./db/carts.json");

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

  console.log(cid);
  console.log(pid);

  const result = cartManager.addProductToCart(cid, pid);

  if (result) {
    res.status(200).json({ status: "success" });
  } else {
    res.status(500).json({ status: "error", error: "Something went wrong" });
  }
});

export default router;
