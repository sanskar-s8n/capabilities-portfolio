import mongoose from "mongoose";

const uri = process.env.MONGODB_URI;

export async function connectMongo() {
  if (!uri) throw new Error("MONGODB_URI is not configured");
  if (mongoose.connection.readyState === 1) return mongoose.connection;
  return mongoose.connect(uri);
}
