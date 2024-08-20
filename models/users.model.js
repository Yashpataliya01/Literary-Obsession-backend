import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
username: {
  type: String,
  required:true,
  unique: true,
},
email:{
  type: String,
  required:true,
  unique: true
},
password: {
  type: String,
  required:true
},
fav: [{
  type: mongoose.Types.ObjectId,
  ref: "Books",
}],
cart:[{
  type: mongoose.Types.ObjectId,
  ref: "Books",
}],
buyed:[{
  bookname : String,
  address : String,
  delivery : String,
  modofpayment : String,
  price : Number,
  image: String,
}]
},{ timestamps: true });

const Users = mongoose.model("Users", userSchema);

export default Users;
