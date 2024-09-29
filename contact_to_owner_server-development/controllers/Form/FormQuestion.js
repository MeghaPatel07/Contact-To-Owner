const FormQuestion = require("../../models/Form/FormQuestion");


exports.createFormQuestion = async (req, res) => {
  try {
    let { IsActive,Que,Ans,category } = req.body;

    const newProject = await new FormQuestion({
      IsActive,Que,Ans ,category
    }).save();

    res.status(200).json({
      isOk: true,
      data: newProject,
      message: "New FormQuestion created successfully",
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ isOk: false, error: err });
  }
};


exports.updateFormQuestion = async (req, res) => {
  try {
    let { IsActive,Que,Ans ,category} = req.body;

    const update = await FormQuestion.findOneAndUpdate(
      { _id: req.params._id },
      req.body,
      { new: true }
    );

    res.status(200).json({
      isOk: true,
      data: update,
      message: "Project updated successfully",
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ isOk: false, error: "Internal server error" });
  }
};


exports.removeFormQuestion = async (req, res) => {
  try {
    const delTL = await FormQuestion.findByIdAndDelete({
      _id: req.params._id,
    });
    


    res.json(delTL);
  } catch (err) {
    res.status(400).send(err);
  }
};
exports.getspecificFormQuestion=async(req,res)=>{
try{
    const spec=await FormQuestion.find({category:req.params}).populate({path:"category"});
    res.status(200).send(spec)

}

catch(error){
    res.status(500).send(error)
}
}
exports.getFormQuestionById=async(req,res)=>{
    try{
        const spec=await FormQuestion.findOne({_id:req.params}).populate({path:"category",select:"category"});
        res.status(200).send(spec)
    
    }
    
    catch(error){
        res.status(500).send(error)
    }
    }

exports.listFormQuestion=async(req,res)=>{
    try{
        const list=await FormQuestion.find().sort({createdAt:-1}).exec();
        res.status(200).send(list)

    }
    catch(err){
        res.status(500).send(err)
    }
}



exports.listFormQuestionDetailByParams = async (req, res) => {
  try {
    let { skip, per_page, sorton, sortdir, match, IsActive } = req.body;
    console.log("Received skip:", skip);
    console.log("Received per_page:", per_page);
    console.log("Received IsActive:", IsActive);

    // if (!skip || !per_page || !IsActive) {
    //   return res.status(400).send("Skip, per_page, and IsActive are required");
    // }

    let query = [
      {
        $match: { IsActive: IsActive },
      },
      
      {
        $lookup: {
          from: "FormCategory",
          localField: "category",
          foreignField: "_id",
          as: "FormCategoryTypes",
        },
      },
      {
        $unwind: {
          path: "$FormCategory",
          preserveNullAndEmptyArrays: true,
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
            {
              $skip: parseInt(skip),
            },
            {
              $limit: parseInt(per_page),
            },
          ],
        },
      },
      {
        $unwind: {
          path: "$stage1",
        },
      },
      {
        $project: {
          count: "$stage1.count",
          data: "$stage2",
          FormCategoryTypes: { $arrayElemAt: ["$FormCategoryTypes", 0] },

        },
      },
    ];

   
    if (sorton && sortdir) {
      let sort = {};
      sort[sorton] = sortdir == "desc" ? -1 : 1;
      query.unshift({
        $sort: sort,
      });
    } else {
      let sort = {};
      sort["createdAt"] = -1;
      query.unshift({
        $sort: sort,
      });
    }

    const list = await FormQuestion.aggregate(query);
    res.json(list);
  } catch (error) {
    console.error("Error in listProjectDetailByParams:", error);
    res.status(500).send("Internal Server Error");
  }
};