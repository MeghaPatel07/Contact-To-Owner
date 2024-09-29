const mongoose = require("mongoose");
const ServiceDetailSchema = new mongoose.Schema(
  {
    category:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "FormCategory",
    },
    Que: {
      type: String,
     
    },
    // Ans:[{
    //     type: String,
       
    //   }],
     
    IsActive: {
        type: Boolean,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("FormQuestion", ServiceDetailSchema);