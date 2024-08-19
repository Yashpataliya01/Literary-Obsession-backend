import express from 'express';
import cookieParser from 'cookie-parser';
import Booking from '../models/books.model.js';

const app = express();
app.use(cookieParser());
app.use(express.json());

export const topbooks = async (req, res) => {
  const { title, author, description, image, category, rating, price, fav } = req.body;
  
  try {
    const bookcreate = await Booking.create({
      title,
      author,
      description,
      image,
      category,
      rating,
      price
    });
    res.status(201).json(bookcreate); 
  } catch (error) {
    if (error.code === 11000 && error.keyPattern && error.keyPattern.author) {
      res.status(400).json({ error: error });
    } else {
      console.error("Error creating book:", error);
      res.status(500).json({ error: error });
    }
  }
};

export const getallbooks = async (req, res) => {
  try {
    const allbooks = await Booking.find({})
    res.status(200).json(allbooks);
  } catch (error) {
    console.error("Error fetching books:", error);
    if (error.name === 'MongoNetworkError') {
      res.status(503).json({ error: 'Database connection error. Please try again later.' });
    } else if (error.name === 'ValidationError') {
      res.status(400).json({ error: 'Validation error occurred.' });
    } else if (error.name === 'CastError') {
      res.status(400).json({ error: 'Invalid data format.' });
    } else {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
};

export const getuserbooks = async (req, res) =>{
  try {
    const allbooks = await Booking.find({});
    res.status(200).json(allbooks);
  } catch (error) {
    console.error("Error fetching books:", error);
    if (error.name === 'MongoNetworkError') {
      res.status(503).json({ error: 'Database connection error. Please try again later.' });
    } else if (error.name === 'ValidationError') {
      res.status(400).json({ error: 'Validation error occurred.' });
    } else if (error.name === 'CastError') {
      res.status(400).json({ error: 'Invalid data format.' });
    } else {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  } 
}