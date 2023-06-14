const mongoose = require("mongoose");

// code for making schema
const mySchema = new mongoose.Schema({
  productName: String,
  productPrice: String,
  productCategory: String,
  userId: String,
  productCompany: String,
});

// code for making model
const myModel = mongoose.model("products", mySchema);

module.exports = myModel;
