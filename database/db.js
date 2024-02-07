import mongoose from "mongoose";

export const Connection = async () => {
  console.log("hlo");
  try {
    // const URL = "mongodb://127.0.0.1/flipcart-clone";

    const URL = `mongodb+srv://${process.env.user}:${process.env.password}@cluster0.xwg166w.mongodb.net/?retryWrites=true&w=majority`;
    await mongoose.connect(URL, {
      // useNewUrlParser: true,
    });
    console.log("connected successfully");
  } catch (error) {
    console.log("error is", error);
  }
};
