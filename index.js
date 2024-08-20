import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import userRoutes from './routes/auth.route.js';
import booksRoutes from './routes/books.route.js';
import funRoutes from './routes/function.route.js';

dotenv.config();
const app = express();
mongoose.connect("mongodb+srv://yashpataliya01:yashdeep@cluster0.6e3mz.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")

app.use(cors({
  origin: "https://literary-obsession-frontend.vercel.app",
  credentials: true,
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get('/', (req, res) => {
  res.send("hello");
});

app.use("/api/auth", userRoutes);
app.use("/api/books", booksRoutes);
app.use("/api/function", funRoutes);

app.listen(process.env.PORT || 8000, () => {
  console.log(`⚙️ Server is running at port : ${process.env.PORT} & ${process.env.mongoDb_server}`);
});
