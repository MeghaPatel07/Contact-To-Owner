const express = require("express");
const multer = require("multer");
const fs = require("fs");
const catchAsync = require("../utils/catchAsync");
const { createFormCategory,  updateFormCategory, removeFormCategory, listFormCategoryByParams,listFormCategory,getFormCategoryById,getFormCategoryBySupplierNameId,listFormCategoryByParamsforReport } = require("../controllers/Form/FormCategory");


const router = express.Router();

// const uploadDirectory = "uploads/FormCategoryImages";
// if (!fs.existsSync(uploadDirectory)) {
//   fs.mkdirSync(uploadDirectory, { recursive: true });
// }

// const multerStorage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, uploadDirectory);
//   },
//   filename: (req, file, cb) => {
//     cb(null, Date.now() + "_" + file.originalname);
//   },
// });

const upload = multer();

router.post(
  "/auth/create/FormCategory",
  upload.none(), 
  catchAsync(createFormCategory)
);

router.put(
    "/auth/update/FormCategory/:_id",
    upload.none(),
    catchAsync(updateFormCategory)
  );

router.get(
    "/auth/list/FormCategory",
    catchAsync(listFormCategory)
  );
router.get("/auth/get/getFormCategoryById/:formcategory", upload.none(),catchAsync(getFormCategoryById))
router.get("/auth/get/getFormCategoryBySupplierNameId/:_id", upload.none(),catchAsync(getFormCategoryBySupplierNameId))
// router.get("/auth/get/generateSupplierWiseProductReportExcel/:_id", upload.none(),catchAsync(generateSupplierWiseProductReportExcel))



router.delete(
    "/auth/remove/FormCategory/:_id",
    catchAsync(removeFormCategory)
  );
  

  router.post(
    "/auth/list/FormCategoryByParamsforReport/:id",
    
    catchAsync(listFormCategoryByParamsforReport)
  );  router.post(
    "/auth/list/FormCategoryByParams",
    
    catchAsync(listFormCategoryByParams)
  );

module.exports = router;