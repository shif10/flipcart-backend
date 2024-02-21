import product from "../models/products-schema.js";

export const productController = async (req, res) => {
  try {
    const products = await product.find({});
    return res.status(200).json({ products });
  } catch (error) {
    console.log(error);
    return res.status(401).json(error.message);
  }
};
export const getProductById = async (req, res) => {
  try {
    const id = req.params.id;
    const data = await product.findOne({ id });

    res.status(200).json({ data });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
