import express from 'express';
import cookieParser from 'cookie-parser';
import Books from '../models/books.model.js';
import Users from '../models/users.model.js';

const app = express();
app.use(cookieParser());
app.use(express.json());

export const addfav = async (req, res) => {
  const { bookid } = req.body;
  try {
    let book = await Books.findById(bookid);
    let user = await Users.findOne({ email: req.user.email });
    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }
    if (!book) {
      return res.status(404).send({ message: "Book not found" });
    }
    if (!user.fav.includes(bookid)) {
      user.fav.push(bookid);
      await user.save();
    }

    res.status(200).send({ message: "Book added to favorites" });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "An error occurred while adding favorite" });
  }
};

export const getfavbook = async (req, res) => {
    try {
      const user = await Users.findOne({ email: req.user.email }).populate('fav'); 
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
      res.status(200).json(user);
    } catch (err) {
      console.error("Error getting user:", err);
      res.status(401).json({ error: "Invalid token" });
    }
};

export const removefav = async (req, res) => {
  const { bookid } = req.body;
  try {
    let book = await Books.findById(bookid);
    let user = await Users.findOne({ email: req.user.email });
    
    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }
    
    if (!book) {
      return res.status(404).send({ message: "Book not found" });
    }
    
    user.fav = user.fav.filter(id => id.toString() !== bookid.toString());
    await user.save();
    
    if (book.fav) {
      book.fav = book.fav.filter(id => id.toString() !== user._id.toString());
      await book.save();
    }
    
    res.status(200).send({ message: "Book removed from favorites" });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "An error occurred while removing favorite" });
  }
};

export const addtocart = async (req, res) => {
 let {bookid} = req.body 
 try {
  const user = await Users.findOne({email: req.user.email});
  if (!user) {
    return res.status(404).send({message: "User not found"});
  }
  if(user.cart.includes(bookid)) {
    return res.status(404).send({message: "Already added"});
  } else{
    user.cart.push(bookid);
    await user.save();
  }
  res.status(200).send({ message: "Book added Successfully" });
 } catch (error) {
  res.status(500).send({ message: "An error occurred while creating your cart" });
 }
}

export const getcart = async (req, res) => {
  try {
    const user = await Users.findOne({ email: req.user.email }).populate('cart'); 
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(200).json(user);
  } catch (err) {
    console.error("Error getting user:", err);
    res.status(401).json({ error: "Invalid token" });
  }
}

export const removecart = async (req, res) => {
  const { bookid } = req.body;
  try {
    let book = await Books.findById(bookid);
    let user = await Users.findOne({ email: req.user.email });
    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }
    if (!book) {
      return res.status(404).send({ message: "Book not found" });
    }
    user.cart = user.cart.filter(id => id.toString() !== bookid.toString());
    await user.save();    
    res.status(200).send({ message: "Book removed from Cart" });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "An error occurred while removing Cart" });
  }
};

export const updatebuyed = async (req, res) => {
  const { newBuyedData } = req.body;
  try {
    const user = await Users.findOne({ email: req.user.email });
    
    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }
    user.buyed.push(...newBuyedData);
    await user.save();

    res.status(200).send({ message: "Buyed data updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "An error occurred while updating buyed data" });
  }
};
