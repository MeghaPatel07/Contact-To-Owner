const FormCategory = require("../../models/Form/FormCategory");
const mongoose = require('mongoose');
// const ExcelJS = require('exceljs');
const path=require('path')
const fs=require("fs");

exports.createFormCategory = async (req, res) => {
  try {
    let { category, IsActive  } = req.body;
    // if (typeof Question === 'string') {
    //   Question = Question.split(',').map(typology => typology.trim());
    // }
    const newsupplierassign = await new FormCategory({
        category, IsActive
    }).save();

    res.status(200).json({
      isOk: true,
      data: newsupplierassign,
      message: "New supplierassign created successfully",
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ isOk: false, error: err });
  }
};



  
const multer = require('multer');
const Question = require("../../models/Form/FormQuestion");

// Set up multer for handling form data
const upload = multer();

exports.updateFormCategory = async (req, res) => {
  try {
    let { category, IsActive  } = req.body;
    // if (typeof Question === 'string') {
    //   Question = Question.split(',').map(typology => typology.trim());
    // }
    const update = await FormCategory.findOneAndUpdate(
      { _id: req.params._id },
      {
        $set: {
        //   "Question": Question,
          "IsActive": IsActive,
          
          "category": category,
        }
      },
      { new: true }
    );

    res.status(200).json({
      isOk: true,
      data: update,
      message: "supplierassign updated successfully",
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ isOk: false, error: "Internal server error" });
  }
};


exports.removeFormCategory = async (req, res) => {
  try {
    const delTL = await FormCategory.findByIdAndDelete({
      _id: req.params._id,
    });
    


    res.json(delTL);
  } catch (err) {
    res.status(400).send(err);
  }
};



exports.listFormCategoryByParamsforReport = async (req, res) => {
  try {
    let { skip, per_page, sorton, sortdir, match, IsActive } = req.body;

    let query = [
      {
        $match: { IsActive: IsActive, category: new mongoose.Types.ObjectId(req.params) },
      },
    //   {
    //     $lookup: {
    //       from: "FormQuestion",
    //       localField: "Question",
    //       foreignField: "_id",
    //       as: "QuestionList",
    //     },
    //   },
      
    //   {
    //     $addFields: {
    //       QuestionCount: { $size: "$QuestionList" },
    //     },
    //   },
      {
        $match: {
          $or: [
            { catergry: { $regex: match, $options: "i" } },
          
          ],
        },
      },
      {
        $sort: { createdAt: -1 },
      },
      {
        $facet: {
          stage1: [
            {
              $group: {
                _id: null,
                count: { $sum: 1 },
              },
            },
          ],
        //   stage2: [
        //     {
        //       $addFields: {
        //         QuestionList: {
        //           $slice: ["$QuestionList", parseInt(skip), parseInt(per_page)],
        //         },
        //       },
        //     },
        //   ],
        },
      },
      {
        $unwind: "$stage1",
      },
    //   {
    //     $project: {
    //       count: "$stage1.count",
    //       data: "$stage2",
    //     },
    //   },
    ];

    if (sorton && sortdir) {
      let sort = {};
      sort[sorton] = sortdir === "desc" ? -1 : 1;
      query.unshift({ $sort: sort });
    } else {
      query.unshift({ $sort: { createdAt: -1 } });
    }

    const list = await FormCategory.aggregate(query);
    res.json(list);
  } catch (error) {
    console.error("Error in listFormCategoryByParams:", error);
    res.status(500).send("Internal Server Error");
  }
};

exports.listFormCategoryByParams = async (req, res) => {
  try {
    let { skip, per_page, sorton, sortdir, match, IsActive } = req.body;

    let query = [
      {
        $match: { IsActive: IsActive },
      },
      {
        $lookup: {
          from: "FormQuestion",
          localField: "Question",
          foreignField: "_id",
          as: "QuestionList",
        },
      },
    
      {
        $match: {
          $or: [
            { "QuestionList.Question": new RegExp(match, "i") },
           
          ],
        },
      },
      {
        $sort: { createdAt: -1 },
      },
      {
        $facet: {
          stage1: [
            {
              $group: {
                _id: null,
                count: {
                  $sum: 1,
                },
              },
            },
          ],
          stage2: [
            { $skip: parseInt(skip) },
            { $limit: parseInt(per_page) },
          ],
        },
      },
      {
        $unwind: "$stage1",
      },
      {
        $project: {
          count: "$stage1.count",
          data: "$stage2",
        },
      },
    ];

    if (sorton && sortdir) {
      let sort = {};
      sort[sorton] = sortdir == "desc" ? -1 : 1;
      query.unshift({ $sort: sort });
    } else {
      query.unshift({ $sort: { createdAt: -1 } });
    }

    const list = await FormCategory.aggregate(query);
    res.json(list);
  } catch (error) {
    console.error("Error in listFormCategoryByParams:", error);
    res.status(500).send("Internal Server Error");
  }
};



exports.listFormCategory=async(req,res)=>{
  try{
    const list=await FormCategory.find() 
    .populate({
              path: 'Question',
            }).sort({createdAt:-1}).exec();
    res.status(200).send(list);
  }
  catch(error){
    res.status(500).send(error)
  }
}
 

exports.getFormCategoryById=async(req,res)=>{
  try{
    console.log(req.params)
      const spec=await FormCategory.findOne({category:req.params.formcategory})  
      res.status(200).send(spec)
  
  }
  catch(error){
      res.status(500).send(error)
  }
  }
  exports.getFormCategoryBycategoryId=async(req,res)=>{
  try{
      const spec = await FormCategory.findOne({category:req.params})  .populate({
        path: 'Question',
        populate: { path: 'Question' } });
      
      res.status(200).send(spec)
  
  }
  catch(error){
      res.status(500).send(error)
  }
  }

//   exports.generateSupplierWiseProductReportExcel = async (req, res) => {
    
  
//     try {
//       const inquiries = await FormCategory.findOne({category:req.params})
//       .populate({
//         path: 'Question',
//         populate: { path: 'Question' } })
//         .sort({ createdAt: -1 });
  
//       // Prepare the data for the Excel report
//       console.log(inquiries.Question)
//       const excelData = inquiries.Question.map((inquiry) => {
//         const Question = {
//           ProductName: inquiry.Description,
//           ProductGroup: inquiry.Question.ProductGroup
//         };
  
//         return {
        
//           // Adding Description and ProductGroup to the excelData
//           ...Question // Assuming there is only one Question per inquiry
//         };
//       });
  
//       // Create the Excel workbook and worksheet
//       const workbook = new ExcelJS.Workbook();
//       const worksheet = workbook.addWorksheet("Supplier Wise Product");
//       worksheet.columns = [
//         { header: "ProductName", key: "ProductName", width: 20 }, // Add Description column
//         { header: "Product Group", key: "ProductGroup", width: 20 } // Add ProductGroup column
//       ];
  
//       // Add the data to the worksheet
//       excelData.forEach((data) => {
//         worksheet.addRow(data);
//       });
  
//       // Generate the Excel file
//       const filePath = path.join(__dirname, "Publish_media.xlsx");
//       await workbook.xlsx.writeFile(filePath);
  
//       // Send the Excel file as a response
//       res.download(filePath, "Publish_media.xlsx", () => {
//         fs.unlinkSync(filePath);
//       });
//     } catch (error) {
//       console.error(error);
//       res.status(500).json({ error: "An error occurred while generating the report" });
//     }
//   };
  

  
