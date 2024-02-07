import { products } from "./constants/data.js";
import product from "./models/products-schema.js";

const defaultData = async () => {
  try {
    await product.insertMany(products);
    console.log("product saves");
  } catch (error) {
    console.log("here is the error", error);
  }
};

export default defaultData;
