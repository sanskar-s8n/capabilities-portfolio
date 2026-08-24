import mongoose from "mongoose";

const ListingSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  category: { type: String, required: true },
  price: Number,
  location: {
    type: { type: String, default: "Point" },
    coordinates: { type: [Number], required: true }
  },
  address: String,
  images: [String],
  features: [String],
  status: { type: String, default: "active" },
  createdAt: { type: Date, default: Date.now }
});

ListingSchema.index({ location: "2dsphere" });

export default mongoose.models.Listing || mongoose.model("Listing", ListingSchema);
