const fs = require("fs");

class ProductManager {
  constructor(path) {
    this.products = [];
    this.path = path;
  }
  async clearProducts() {
    this.products = [];
    const productsJSON = JSON.stringify(this.products, null, 2);
    await fs.promises.writeFile(this.path, productsJSON);
  }
  validateProduct = ({ title, description, price, thumbnail, code, stock }) => {
    if (!title || !description || !price || !thumbnail || !code || !stock) {
      throw new Error("Missing properties");
    }

    const existingProduct = this.products.find((product) => product.code === code);
    if (existingProduct) {
      throw new Error("Product with code already exists");
    }
  };

  async saveProducts() {
    const productsJSON = JSON.stringify(this.products, null, 2);
    await fs.promises.writeFile(this.path, productsJSON);
  }

  async addProduct(title, description, price, thumbnail, code, stock) {
    const newProduct = {
      id: this.products.length + 1,
      title,
      description,
      price,
      thumbnail,
      code,
      stock,
    };

    this.validateProduct(newProduct);
    this.products.push(newProduct);
    await this.saveProducts();
    return newProduct;
  }


  async getProducts() {
    const productsJSON = await fs.promises.readFile(this.path, "utf-8");
    this.products = JSON.parse(productsJSON);
    return this.products;
  }


  async getProductById(id) {
    const product = this.products.find((product) => product.id === id);
    if (!product) {
      throw new Error("Product not found");
    }
    return product;
  }


  async updateProduct(id, title, description, price, thumbnail, code, stock) {

    const productIndex = this.products.findIndex((product) => product.id === id);
    if (productIndex === -1) {
      throw new Error("Product not found");
    }

    if (!title || !description || !price || !thumbnail || !code || !stock) {
      throw new Error("Missing properties");
    }
    this.products[productIndex] = { id, title, description, price, thumbnail, code, stock };
    await this.saveProducts();
    return this.products[productIndex];
  }


  async deleteProduct(id) {
    const productIndex = this.products.findIndex((product) => product.id === id);
    if (productIndex === -1) {
      throw new Error("Product not found");
    }
    const deletedProduct = this.products[productIndex];
    this.products.splice(productIndex, 1);
    await this.saveProducts();
    return deletedProduct;
  }
}
module.exports = ProductManager;
