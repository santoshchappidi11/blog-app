import mongoose, { Schema } from "mongoose";

const blogSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  subtitle: {
    type: String,
    required: true,
  },
  image1: {
    type: String,
    required: true,
  },
  description1: {
    type: String,
    required: true,
  },
  image2: {
    type: String,
  },
  description2: {
    type: String,
  },
  image3: {
    type: String,
  },
  description3: {
    type: String,
  },
  category: {
    type: String,
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  likes: {
    type: [String],
  },
  bookmarks: {
    type: [String],
  },
  comments: {
    type: [Object],
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("Blog", blogSchema);
