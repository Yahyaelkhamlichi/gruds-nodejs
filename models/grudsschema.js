const mongoose = require("mongoose");
const Schema = mongoose.Schema;
 
// define the Schema (the structure of the article)
const GrudShema = new Schema({
  Title:String,
  Price:Number,
  Taxes:Number,
  Ads:Number,
  Discount:Number,
  Category:String,
},
{ timestamps: true }
);
 
 
// Create a model based on that schema
const GrudShema1 = mongoose.model("Gruddata", GrudShema);
 
 
// export the model
module.exports = GrudShema1;