const express = require("express");
const multer = require("multer");
const fs = require("fs");
const catchAsync = require("../utils/catchAsync");
const {createpdf, createCustomerQR, listCustomerQR, updateCustomerQR, removeCustomerQR, listCustomerQRByParams ,getCustomerQRById} = require("../controllers/QRMaster/Customer_QR");


const router = express.Router();
const directories = [ "uploads/CustomerQRpdf"];
directories.forEach((dir) => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
});

// Generalized Multer storage configuration
const multerStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Determine the appropriate directory based on the file type
    let dir;
    if (file.mimetype === "application/pdf") {
      dir = "uploads/CustomerQRpdf";
    } else {
      const extension = file.originalname.split(".").pop().toLowerCase();
      if (extension === "pdf") {
        dir = "uploads/CustomerQRpdf";
      }  
    }
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    // Generate a unique filename for the uploaded file
    cb(null, Date.now() + "_" + file.originalname);
  },
});

// Set up multer for handling file uploads with multiple fields
const upload = multer({ storage: multerStorage });

router.post(
  "/auth/create/CustomerQR",
  
  catchAsync(createCustomerQR)
);
router.put(
  "/auth/create/pdf/:_id",
  
  catchAsync(createpdf)
);
// router.put(
//     "/auth/update/CustomerQR/:_id",
//     upload.single("newImage"),
//     catchAsync(updateCustomerQR)
//   );
// Route for updating a product by its ID
router.put(
  "/auth/update/CustomerQR/:_id",
  upload.single("pdf"),
  catchAsync(updateCustomerQR)
);

router.get(
    "/auth/list/CustomerQR",
    catchAsync(listCustomerQR)
  );

router.delete(
    "/auth/remove/CustomerQR/:_id",
    catchAsync(removeCustomerQR)
  );
  

  router.post(
    "/auth/listCustomerQRbyparam",
    
    catchAsync(listCustomerQRByParams)
  );

  router.get('/auth/get/CustomerQR/:_id',catchAsync(getCustomerQRById))
module.exports = router;