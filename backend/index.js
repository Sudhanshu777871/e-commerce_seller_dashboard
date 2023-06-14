const express = require("express");
const users = require("./db/user");
const cors = require("cors");
const products = require("./db/products");
require("./db/config");
const app = express();

app.use(express.json());
app.use(cors());
// code for making post api for signup
app.post("/register", async (req, res) => {
  let getUsers = new users(req.body);
  let save = await getUsers.save();
  save = save.toObject();
  delete save.password;
  console.log(save);
  res.send(save);
});

// code for making api for login
app.post("/login", async (req, res) => {
  if (req.body.email && req.body.password) {
    let getUserLogin = await users.findOne(req.body).select("-password");
    if (getUserLogin) {
      res.send(getUserLogin);
    } else {
      res.send({ result: "No Result Found" });
    }
  } else {
    res.send("Please Enter All Fields");
  }
});

// code for making api for adding items
app.post("/add-products", async (req, res) => {
  const getProducts = new products(req.body);
  const saveProducts = await getProducts.save();
  res.send(saveProducts);
});

// code for making api for fetching all the products
app.get("/products", async (req, res) => {
  let getProducts = await products.find();
  console.log(getProducts);
  res.send(getProducts);
});

// CODE FOR MAKING API FOR DELETING PRODUCTS FROM DATABASE
app.delete("/product/:id", async (req, res) => {
  const getDelete = await products.deleteOne({ _id: req.params.id });
  console.log(getDelete);
  res.send(getDelete);
});


// CODE FOR MAKING API FOR FETCHING PRODUCTS FROM THROUGH ID FROM DATABASE
app.get("/product/:id", async (req, res) => {
  const getData = await products.findOne({_id:req.params.id});
res.send(getData);
});

// CODE FOR MAKING API FOR UPDATING PRODUCTS  THROUGH ID FROM DATABASE
app.put("/update/:id", async (req, res) => {
  const updateData = await products.updateOne({_id:req.params.id}, {$set:req.body});
if(updateData.modifiedCount==1){
res.send({result:"Product Is Updated SuccessFully...."});
}
else{
  res.send({result:"Product Is Not Updated..."});
}
});


// code for making search api
app.get('/search/:key',async(req, res)=>{
const serachApiData = await products.find({
  "$or":[
    {productName:{$regex:req.params.key}}
  ]
})
res.send(serachApiData);
})
app.listen(8400);
