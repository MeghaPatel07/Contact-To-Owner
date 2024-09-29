const mongoose = require("mongoose");
const ServiceDetailSchema = new mongoose.Schema(
  {
    category: {
      type: String,
     
    },
    
    IsActive: {
        type: Boolean,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("FormCategory", ServiceDetailSchema);