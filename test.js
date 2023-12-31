async function testProductManager() {
  const ProductManager = require("./productManager");


  const productManager = new ProductManager("./products.json");

  await productManager.clearProducts();


  console.log({ products: await productManager.getProducts() });


  await productManager.addProduct("Black Shirt", "A classic black shirt is a wardrobe staple, and this one is no exception. Featuring a flattering fit and a timeless design, this shirt is perfect for any occasion.r", 3000, "https://firebasestorage.googleapis.com/v0/b/estonoesmoda-34be0.appspot.com/o/products%2Fblack-shirt.jpg?alt=media&token=d9694583-cdad-4e01-a6a9-cedad9127ae4&_gl=1*l4f6qh*_ga*NTYwODIwNDQyLjE2OTY4OTkwODY.*_ga_CW55HF8NVT*MTY5Njk4NTUwNy41LjEuMTY5Njk5MTkwMS42MC4wLjA.", "BS", 8);
  await productManager.addProduct("Square Dress", "Step into timeless elegance with this vintage-inspired grey dress, perfect for special occasions and garden parties.", 5000, "https://firebasestorage.googleapis.com/v0/b/estonoesmoda-34be0.appspot.com/o/products%2Fdressgreysquare.webp?alt=media&token=e157a218-6e9f-4ac6-ab3a-10c555393cbe&_gl=1*e8tva*_ga*NTYwODIwNDQyLjE2OTY4OTkwODY.*_ga_CW55HF8NVT*MTY5Njk4NTUwNy41LjEuMTY5Njk5MjA1MS40NC4wLjA.", "SD", 2);


  console.log({ productsAfterInsert: await productManager.getProducts() });


  try {
    await productManager.addProduct("", "Your new go-to pair of premium denim jeans, offering a comfortable and flattering fit for versatile, stylish looks.", 5000, "https://firebasestorage.googleapis.com/v0/b/estonoesmoda-34be0.appspot.com/o/products%2Fbluejeans.jpg?alt=media&token=2de6980f-9dd1-454b-9d4d-cd099e31df8b&_gl=1*nzokzp*_ga*NTYwODIwNDQyLjE2OTY4OTkwODY.*_ga_CW55HF8NVT*MTY5Njk4NTUwNy41LjEuMTY5Njk5MTk4MC41NS4wLjA.", "BJ", 3);
  } catch (error) {
    console.log({ error: error.message });
  }


  try {
    await productManager.addProduct("Blue Jeans", "Your new go-to pair of premium denim jeans, offering a comfortable and flattering fit for versatile, stylish looks.", 5000, "https://firebasestorage.googleapis.com/v0/b/estonoesmoda-34be0.appspot.com/o/products%2Fbluejeans.jpg?alt=media&token=2de6980f-9dd1-454b-9d4d-cd099e31df8b&_gl=1*nzokzp*_ga*NTYwODIwNDQyLjE2OTY4OTkwODY.*_ga_CW55HF8NVT*MTY5Njk4NTUwNy41LjEuMTY5Njk5MTk4MC41NS4wLjA.", "SD", 3);
  } catch (error) {
    console.log({ error: error.message });
  }


  try {
    await productManager.getProductById(10);
  } catch (error) {
    console.log({ error: error.message });
  }


  console.log({ specificProduct: await productManager.getProductById(1) });


  try {
    const updatedProduct = await productManager.updateProduct(
      1,
      "Black Shirt Modify",
      "A classic black Modify shirt is a wardrobe staple, and this one is no exception. Featuring a flattering fit and a timeless design, this shirt is perfect for any occasion.r",
      6000,
      "https://firebasestorage.googleapis.com/v0/b/estonoesmoda-34be0.appspot.com/o/products%2Fblack-shirt.jpg?alt=media&token=d9694583-cdad-4e01-a6a9-cedad9127ae4&_gl=1*l4f6qh*_ga*NTYwODIwNDQyLjE2OTY4OTkwODY.*_ga_CW55HF8NVT*MTY5Njk4NTUwNy41LjEuMTY5Njk5MTkwMS42MC4wLjA.",
      "BSM",
      7
    );
    console.log({ updatedProduct });

    console.log({ updatedProduct: await productManager.getProductById(1) });
  } catch (error) {
    console.log({ error: error.message });
  }


  try {
    const deletedProduct = await productManager.deleteProduct(1);
    console.log({ deletedProduct });

    console.log({ productsAfterDelete: await productManager.getProducts() });
  } catch (error) {
    console.log({ error: error.message });
  }
  await productManager.clearProducts();
}

testProductManager()
  .then(() => console.log("Done"))
  .catch((error) => console.log(error));
