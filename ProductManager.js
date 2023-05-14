import fs from "fs";

class ProductManager {
  #path;

  constructor(path) {
    this.#path = path;
  }

  /******************************************************************
   * Local function definitions
   ******************************************************************/

  /**
   * Check if the product code already exists
   * @param  {Array}    products  Product list
   * @param  {Number}   code      Product code
   *
   * @return {Boolean}            True if the product code already exists, false otherwise
   */
  #productCodeExist = (products, code) => {
    return products.some((element) => {
      return element.code === code;
    });
  };

  /**
   * Check if the product id already exists
   * @param  {Array}    products  Product list
   * @param  {Number}   id        Product id
   *
   * @return {Boolean}            True if the product id already exists, false otherwise
   */
  #productIdExist = (products, id) => {
    return products.some((element) => {
      return element.id === id;
    });
  };

  /**
   * Generate the next product id
   * @param  {Array}    products  Product list
   *
   * @return {Number}             Next product id
   */
  #generateNextId = (products) => {
    if (products.length > 0) {
      return products[products.length - 1].id + 1;
    } else {
      return 0;
    }
  };

  /******************************************************************
   * Public function definitions
   ******************************************************************/

  /**
   * Add one product
   * @param  {Object}   product   Product to add
   * @param  {Function} callback  Callback to report any error
   */
  addProduct = async (product, callback) => {
    try {
      if (!product) {
        throw new Error("Invalid product");
      } else {
        const products = JSON.parse(await fs.promises.readFile(this.#path, { encoding: "utf-8" }));

        if (this.#productCodeExist(products, product.code)) {
          throw new Error("Product code duplicated");
        } else {
          const newProduct = { ...product, id: this.#generateNextId(products) };

          products.push(newProduct);

          await fs.promises.writeFile(this.#path, JSON.stringify(products));
        }
      }
    } catch (error) {
      callback(error);
    }
  };

  /**
   * Return one product by id
   * @param  {Number} id          Product id
   * @param  {Function} callback  Callback to report any error
   *
   * @return {Object}             Product, or undefined in case of error
   */
  getProductById = async (id, callback) => {
    try {
      const products = JSON.parse(await fs.promises.readFile(this.#path, { encoding: "utf-8" }));

      if (!this.#productIdExist(products, id)) {
        throw new Error("Not found");
      } else {
        return products.find((element) => {
          return element.id === id;
        });
      }
    } catch (error) {
      callback(error);
    }
  };

  /**
   * Return all the products
   * @param  {Function} callback  Callback to report any error
   *
   * @return {Object}             Product list, or undefined in case of error
   */
  getProducts = async (callback) => {
    try {
      return JSON.parse(await fs.promises.readFile(this.#path, { encoding: "utf-8" }));
    } catch (error) {
      callback(error);
    }
  };

  /**
   * Delete one product
   * @param  {Number}   id          Product id
   * @param  {Function} callback    Callback to report any error
   */
  deleteProduct = async (id, callback) => {
    try {
      const products = JSON.parse(await fs.promises.readFile(this.#path, { encoding: "utf-8" }));

      if (!this.#productIdExist(products, id)) {
        throw new Error("Not found");
      } else {
        const newProducts = products.filter((element) => {
          return element.id !== id;
        });

        await fs.promises.writeFile(this.#path, JSON.stringify(newProducts));
      }
    } catch (error) {
      callback(error);
    }
  };

  /**
   * Update one product
   * @param  {Object}   product   Product to update
   * @param  {Number}   id        Product id
   * @param  {Function} callback  Callback to report any error
   */
  updateProduct = async (product, id, callback) => {
    try {
      const products = JSON.parse(await fs.promises.readFile(this.#path, { encoding: "utf-8" }));

      if (!this.#productIdExist(products, id)) {
        throw new Error("Not found");
      } else if (this.#productCodeExist(products, product.code)) {
        throw new Error("Product code duplicated");
      } else {
        const index = products.findIndex((element) => {
          return element.id === id;
        });
        const newProduct = { ...product, id: products[index].id };
        products[index] = newProduct;

        await fs.promises.writeFile(this.#path, JSON.stringify(products));
      }
    } catch (error) {
      callback(error);
    }
  };
}

/**
 * Example
 *

const productManager = new ProductManager("products.json");

const products = await productManager.getProducts((error) => {
  console.log(error.message);
});

console.log(products);

*/
