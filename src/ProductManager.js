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
   *
   * @return {Boolean}            False if an error occurred, true otherwise
   */
  addProduct = async (product) => {
    try {
      if (!product) {
        throw new Error("Invalid product");
      } else {
        const products = JSON.parse(await fs.promises.readFile(this.#path, { encoding: "utf-8" }));

        if (this.#productCodeExist(products, product.code)) {
          throw new Error(`Product code: ${product.code} duplicated`);
        } else {
          products.push({ ...product, id: this.#generateNextId(products) });

          await fs.promises.writeFile(this.#path, JSON.stringify(products, null, 2));

          return true;
        }
      }
    } catch (error) {
      console.log(error.message);
      return false;
    }
  };

  /**
   * Return one product by id
   * @param  {Number} id          Product id
   *
   * @return {Object}             Product, or undefined in case of error
   */
  getProductById = async (id) => {
    try {
      const products = JSON.parse(await fs.promises.readFile(this.#path, { encoding: "utf-8" }));

      if (!this.#productIdExist(products, id)) {
        throw new Error(`Product id: ${id} not found`);
      } else {
        return products.find((element) => {
          return element.id === id;
        });
      }
    } catch (error) {
      console.error(error.message);
      return false;
    }
  };

  /**
   * Return all the products
   *
   * @return {Array}            Product list, or undefined in case of error
   */
  getProducts = async () => {
    try {
      return JSON.parse(await fs.promises.readFile(this.#path, { encoding: "utf-8" }));
    } catch (error) {
      console.log(error.message);
      return false;
    }
  };

  /**
   * Delete one product
   * @param  {Number}   id        Product id
   *
   * @return {Boolean}            False if an error occurred, true otherwise
   */
  deleteProduct = async (id) => {
    try {
      const products = JSON.parse(await fs.promises.readFile(this.#path, { encoding: "utf-8" }));

      if (!this.#productIdExist(products, id)) {
        throw new Error(`Product id: ${id} not found`);
      } else {
        const newProducts = products.filter((element) => {
          return element.id !== id;
        });

        await fs.promises.writeFile(this.#path, JSON.stringify(newProducts, null, 2));

        return true;
      }
    } catch (error) {
      console.log(error.message);
      return false;
    }
  };

  /**
   * Update one product
   * @param  {Object}   product   Product to update
   * @param  {Number}   id        Product id
   *
   * @return {Boolean}            False if an error occurred, true otherwise
   */
  updateProduct = async (product, id) => {
    try {
      const products = JSON.parse(await fs.promises.readFile(this.#path, { encoding: "utf-8" }));

      if (!this.#productIdExist(products, id)) {
        throw new Error(`Product id: ${id} not found`);
      } else if (this.#productCodeExist(products, product.code)) {
        throw new Error(`Product code: ${product.code} duplicated`);
      } else {
        const index = products.findIndex((element) => {
          return element.id === id;
        });

        products[index] = { ...products[index], ...product, id: products[index].id };

        await fs.promises.writeFile(this.#path, JSON.stringify(products, null, 2));

        return true;
      }
    } catch (error) {
      console.log(error.message);
      return false;
    }
  };
}

export default ProductManager;
