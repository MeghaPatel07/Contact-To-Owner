const mongoose = require("mongoose");
const ServiceDetailSchema = new mongoose.Schema(
  {
    TotalNo: {
        type: Number,
    },
     Name: {
        type: String,
    },
    Email: {
        type: String,
    },
    
    Contact1: {
        type: Number,
    },
    Contact2: {
        type: Number,
    },
    State:{
        type: String,
    },
    City:{
        type: String,
    },
    Area:{
        type: String,
    },
    Pin:{
        type: String,
    },
    Address:{
        type: String,
    },
    Package:{
        type: String,
    },
    pdf:{
        type: String,
    },
    IsActive: {
        type: Boolean,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("FranchiseQR", ServiceDetailSchema);