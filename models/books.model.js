import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true,
  },
  author: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  category: {
    type: Array,
    required: true
  },
  rating: {
    type: Number,
  },
  price: {
    type: Number,
    required: true,
  }
}, { timestamps: true });

const Books = mongoose.model("Books", bookSchema);

export default Books;
