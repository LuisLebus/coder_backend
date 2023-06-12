import { Server } from "socket.io";
import path from "path";

import ProductManager from "../ProductManager.js";
import __rootpath from "../rootpath.js";

const productManager = new ProductManager(path.join(__rootpath, "db", "products.json"));

const startSocketServer = (httpServer) => {
  const socketServer = new Server(httpServer);

  socketServer.on("connection", async (socket) => {
    //Send all products to the new client
    const products = await productManager.getProducts();
    socket.emit("products", products);

    //Someone deleted one product
    socket.on("delete", async (data) => {
      await productManager.deleteProduct(Number(data));
      const products = await productManager.getProducts();
      socketServer.emit("products", products);
    });

    //Someone added one product
    socket.on("add", async (data) => {
      const defaulProduct = {
        title: "Producto generico",
        description: "Descripción del producto generico",
        price: 0,
        thumbnail: [],
        code: "prod-gen",
        stock: 0,
        category: "none",
        status: true,
      };

      await productManager.addProduct({ ...defaulProduct, ...data });
      const products = await productManager.getProducts();
      socketServer.emit("products", products);
    });
  });
};

export default startSocketServer;
