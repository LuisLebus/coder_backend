class ProductManager {
  #products;

  constructor() {
    this.#products = [];
  }

  //It checks if the product code already exists
  #productCodeExist = (code) => {
    return this.#products.some((element) => {
      return element.code === code;
    });
  };

  //It checks if the product id already exists
  #productIdExist = (id) => {
    return this.#products.some((element) => {
      return element.id === id;
    });
  };

  //It generates the next product id
  #generateNextId = () => {
    if (this.#products.length > 0) {
      return this.#products[this.#products.length - 1].id + 1;
    } else {
      return 0;
    }
  };

  //It adds one product
  addProduct = (title, description, price, thumbnail, code, stock) => {
    if (!title || !description || !price || !thumbnail || !code || !stock) {
      console.log("Error: Invalid parameters");
    } else {
      if (!this.#productCodeExist(code)) {
        const product = {
          title,
          description,
          price,
          thumbnail,
          code,
          stock,
          id: this.#generateNextId(),
        };
        this.#products.push(product);
      } else {
        console.log("Error: Product code duplicated");
      }
    }
  };

  //It returns one product by id
  getProductById = (id) => {
    if (this.#productIdExist(id)) {
      return this.#products.find((element) => {
        return element.id === id;
      });
    } else {
      console.log("Not found");
      return null;
    }
  };

  //It returns all the products
  getProducts = () => {
    return this.#products;
  };
}

//
//Testing
//
const productManager = new ProductManager();

console.log(productManager.getProducts());

productManager.addProduct("producto prueba", "Este es un producto prueba", 200, "Sin imagen", "abc123", 25);

console.log(productManager.getProducts());

productManager.addProduct("producto prueba", "Este es un producto prueba", 200, "Sin imagen", "abc123", 25); //It generates an error since code=abc123 already exists

console.log(productManager.getProductById(0)); //It returns the product
console.log(productManager.getProductById(5)); //It returns null since id=5 does not exist
