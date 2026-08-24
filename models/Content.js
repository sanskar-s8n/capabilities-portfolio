import mongoose from "mongoose";

const ContentSchema = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String, unique: true },
  body: Object,
  excerpt: String,
  category: String,
  tags: [String],
  coverImage: String,
  seoTitle: String,
  seoDescription: String,
  publishedAt: Date,
  author: String,
  status: { type: String, enum: ["draft", "published"], default: "draft" }
});

export default mongoose.models.Content || mongoose.model("Content", ContentSchema);
