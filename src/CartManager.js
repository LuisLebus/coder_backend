import fs from "fs";

class CartManager {
  #path;

  constructor(path) {
    this.#path = path;
  }

  /******************************************************************
   * Local function definitions
   ******************************************************************/

  /**
   * Check if the cart id already exists
   * @param  {Array}    carts     Cart list
   * @param  {Number}   id        Cart id
   *
   * @return {Boolean}            True if the cart id already exists, false otherwise
   */
  #cartIdExist = (carts, id) => {
    return carts.some((element) => {
      return element.id === id;
    });
  };

  /**
   * Generate the next cart id
   * @param  {Array}    carts     Cart list
   *
   * @return {Number}             Next cart id
   */
  #generateNextId = (carts) => {
    if (carts.length > 0) {
      return carts[carts.length - 1].id + 1;
    } else {
      return 0;
    }
  };

  /******************************************************************
   * Public function definitions
   ******************************************************************/

  /**
   * Create one cart
   *
   * @return {Boolean}            False if an error occurred, true otherwise
   */
  async createCart() {
    try {
      const carts = JSON.parse(await fs.promises.readFile(this.#path, { encoding: "utf-8" }));

      carts.push({ id: this.#generateNextId(carts), products: [] });

      await fs.promises.writeFile(this.#path, JSON.stringify(carts, null, 2));

      return true;
    } catch (error) {
      console.log(error.message);
      return false;
    }
  }

  /**
   * Add one product to a cart
   * @param  {Object}   product   Product to add
   *
   * @return {Boolean}            False if an error occurred, true otherwise
   */
  async addProductToCart(cid, pid) {
    try {
      const carts = JSON.parse(await fs.promises.readFile(this.#path, { encoding: "utf-8" }));

      if (!this.#cartIdExist(carts, cid)) {
        throw new Error(`Cart id: ${cid} not found`);
      } else {
        //Find index of cart in array
        const cIndex = carts.findIndex((element) => {
          return element.id === cid;
        });

        //Find index of pruduct in array
        const pIndex = carts[cIndex].products.findIndex((element) => {
          return element.product === pid;
        });

        //If product already exists increment its quantity, otherwise create object and push it
        if (pIndex !== -1) {
          carts[cIndex].products[pIndex].quantity++;
        } else {
          carts[cIndex].products.push({ product: pid, quantity: 1 });
        }

        await fs.promises.writeFile(this.#path, JSON.stringify(carts, null, 2));

        return true;
      }
    } catch (error) {
      console.log(error.message);
      return false;
    }
  }

  /**
   * Return one cart by id
   * @param  {Number} id          Cart id
   *
   * @return {Object}             Cart, or undefined in case of error
   */
  async getCartById(id) {
    try {
      const carts = JSON.parse(await fs.promises.readFile(this.#path, { encoding: "utf-8" }));

      if (!this.#cartIdExist(carts, id)) {
        throw new Error(`Cart id: ${id} not found`);
      } else {
        return carts.find((element) => {
          return element.id === id;
        });
      }
    } catch (error) {
      console.error(error.message);
      return false;
    }
  }
}

export default CartManager;
