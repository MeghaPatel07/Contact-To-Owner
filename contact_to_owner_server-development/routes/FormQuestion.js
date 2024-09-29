const express=require("express")
const router=express.Router()
const multer = require("multer");
const catchAsync = require("../utils/catchAsync");
const upload = multer();
const { getFormQuestionById,listFormQuestionDetailByParams,listFormQuestion,getspecificFormQuestion, updateFormQuestion,createFormQuestion,removeFormQuestion} = require("../controllers/Form/FormQuestion");
router.post("/auth/create/FormQuestion",upload.none(),catchAsync(createFormQuestion))
router.get("/auth/list/FormQuestion",catchAsync(listFormQuestion))
router.get("/auth/getbyid/FormQuestion/:_id",catchAsync(getspecificFormQuestion))
router.put("/auth/update/FormQuestion/:_id",catchAsync(updateFormQuestion))
router.get("/auth/getbyid/getFormQuestionById/:_id",catchAsync(getFormQuestionById))
router.delete("/auth/delete/FormQuestion/:_id",catchAsync(removeFormQuestion))
router.post(
    "/auth/list-by-params/FormQuestion",
    catchAsync(listFormQuestionDetailByParams)
  );
module.exports = router;