const express = require("express");
const multer = require("multer");
const fs = require("fs");
const catchAsync = require("../utils/catchAsync");
const { createFranchiseQR, listFranchiseQR, updateFranchiseQR, removeFranchiseQR, listFranchiseQRByParams } = require("../controllers/QRMaster/Franchise_Qr");


const router = express.Router();
const directories = [ "uploads/FranchiseQRpdf"];
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
      dir = "uploads/FranchiseQRpdf";
    } else {
      const extension = file.originalname.split(".").pop().toLowerCase();
      if (extension === "pdf") {
        dir = "uploads/FranchiseQRpdf";
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
  "/auth/create/FranchiseQR",
  
  catchAsync(createFranchiseQR)
);
 
// router.put(
//     "/auth/update/FranchiseQR/:_id",
//     upload.single("newImage"),
//     catchAsync(updateFranchiseQR)
//   );
// Route for updating a product by its ID
router.put(
  "/auth/update/FranchiseQR/:_id",
  upload.single("pdf"),
  catchAsync(updateFranchiseQR)
);

router.get(
    "/auth/list/FranchiseQR",
    catchAsync(listFranchiseQR)
  );

router.delete(
    "/auth/remove/FranchiseQR/:_id",
    catchAsync(removeFranchiseQR)
  );
  

  router.post(
    "/auth/listFranchiseQRbyparam",
    
    catchAsync(listFranchiseQRByParams)
  );

module.exports = router;