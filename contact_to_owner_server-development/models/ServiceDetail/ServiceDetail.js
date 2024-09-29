const mongoose = require("mongoose");
const ServiceDetailSchema = new mongoose.Schema(
  {
    ServiceName: {
      type: String,
     
    },
    Description: {
        type: String,
    },
    Detail: {
        type: String,
    },
    imageURL: {
        type: String,
    },
    IsActive: {
        type: Boolean,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("ServiceDetail", ServiceDetailSchema);