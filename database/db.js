import mongoose from "mongoose";

export const Connection = async () => {
  console.log("hlo");
  try {
    // const URL = "mongodb://127.0.0.1/flipcart-clone";

    const URL =
      process.env.MONGODBURL ||
      `mongodb+srv://${process.env.user}:${process.env.password}@cluster0.xwg166w.mongodb.net/?retryWrites=true&w=majority`;
    await mongoose.connect(URL, {
      // useNewUrlParser: true,
    });
  } catch (error) {
    console.log("error is", error);
  }
};
