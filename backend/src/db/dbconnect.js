import mongoose from "mongoose";

export async function dbConnect() {
  try {
    const { MONGODB_USERNAME, MONGODB_PASSWORD } = process.env;

    // Constructing the connection URI dynamically
    const uri = `mongodb+srv://${MONGODB_USERNAME}:${MONGODB_PASSWORD}@cluster0.9grsz.mongodb.net/ecommerce?retryWrites=true&w=majority&appName=Cluster0`;

    await mongoose.connect(uri);
    console.log("Db connected successfully");
  } catch (error) {
    console.error("Db connection Error:", error); // Improved error logging
  }
}
