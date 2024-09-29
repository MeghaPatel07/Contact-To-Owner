const FranchiseQR = require("../../models/QRMAster/Franchise_QR")
const QRCode = require('qrcode');
const { PDFDocument, rgb } = require('pdf-lib');
const path = require('path');

// exports.createFranchiseQR = async (req, res) => {
  
//   try {
//     let pdf =
//     req.files["pdf"] && req.files["pdf"][0]
//       ? `uploads/FranchiseQRpdf/${req.files["pdf"][0].filename}`
//       : null;
//     let { Name,Email,Contact1,Contact2,State,City,Area,Pin,Address,Package, IsActive } = req.body;

     

//     const newProject = await new FranchiseQR({
//         Name,Email,Contact1,Contact2,State,City,Area,Pin,Address,Package, IsActive,pdf 
//     }).save();

//     res.status(200).json({
//       isOk: true,
//       data: newProject,
//       message: "New project created successfully",
//     });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ isOk: false, error: "Internal server error" });
//   }

// };
// Import necessary modules
const fs = require('fs');
// const { generatePDFWithQR } = require('./pdfGenerator'); // Import PDF generation function
 // Import the path module

 const generateQRCode = async (data, filename) => {
  const uniqueFilename = `${filename}_${Date.now()}.png`; // Append timestamp to make the filename unique
  const qrCodeDir = path.join(__dirname, '../../uploads/FranchiseQRpdf');

  // Create the directory if it doesn't exist
  if (!fs.existsSync(qrCodeDir)) {
      fs.mkdirSync(qrCodeDir, { recursive: true });
  }

  const qrCodePath = path.join(qrCodeDir, uniqueFilename);

  try {
      await QRCode.toFile(qrCodePath, data);
      console.log('QR code generated successfully');
      return qrCodePath; // Return the path of the generated QR code image
  } catch (error) {
      console.error('Error generating QR code:', error);
      throw error; // Throw the error to handle it in the caller function
  }
};


const generatePDFWithQR = async (name) => {
  const pdfDoc = await PDFDocument.create();
  const page = pdfDoc.addPage();
  const { width, height } = page.getSize();

  let yOffset = height;

  try {
      for (let i = 0; i < 5; i++) {
        
        const qrCodeData = `contact person : ${name} \n Contact No : 99999999`;

          const qrCodeFilename = `${name}_${i}.png`; // Add index to the filename to make it unique
          const qrCodePath = await generateQRCode(qrCodeData, qrCodeFilename);

          const qrCodeImage = await pdfDoc.embedPng(fs.readFileSync(qrCodePath));
          let qrCodeDims = qrCodeImage.scale(0.5);
          if (i === 4) {
            qrCodeDims = qrCodeImage.scale(3);
            const xCoordinate = (width / 4 - qrCodeDims.width / 2 )  ; // Calculate the x coordinate to center the QR code horizontally
            page.drawImage(qrCodeImage, {
                x: 0.82,
                y: yOffset - qrCodeDims.height,
                width: qrCodeDims.width,
                height: qrCodeDims.height,
            });
          }
          else if (i % 2 === 0) {
            console.log( width / 4 - qrCodeDims.width / 2)
              // If i is even, draw the QR code on the left side of the page
              page.drawImage(qrCodeImage, {
              
                  x: width / 4 - qrCodeDims.width / 2,
                  y: yOffset - qrCodeDims.height,
                  width: qrCodeDims.width,
                  height: qrCodeDims.height,
                  
              });
          } 
          else {
              // If i is odd, draw the QR code on the right side of the page
              page.drawImage(qrCodeImage, {
                  x: (3 * width) / 4 - qrCodeDims.width / 2,
                  y: yOffset - qrCodeDims.height,
                  width: qrCodeDims.width,
                  height: qrCodeDims.height,
              });
              yOffset -= qrCodeDims.height + 20; // Adjust yOffset for the next row
          }

          // Unlink the temporary QR code image file after embedding it into the PDF
          fs.unlinkSync(qrCodePath);
      }

      const pdfBytes = await pdfDoc.save();
      return pdfBytes;
  } catch (error) {
      console.error('Error generating PDF with QR codes:', error);
      throw error; // Throw the error to handle it in the caller function
  }
};



// Controller function to create Franchise QR
exports.createFranchiseQR = async (req, res) => {
    try {
        // Get data from request body
        let { TotalNo, Name, Email, Contact1, Contact2, State, City, Area, Pin, Address, Package, IsActive } = req.body;

        // Array to store the generated FranchiseQR documents
        const createdFranchiseQRs = [];

        // Loop to generate the specified number of entries
        for (let i = 0; i < TotalNo; i++) {
            // Generate PDF with QR codes for each entry
            const pdfBytes = await generatePDFWithQR(Name);

            // Specify the path to save the PDF file
            const pdfFilePath = path.join(__dirname, `../../uploads/FranchiseQRpdf/${Name}_${i}.pdf`);
            const pdf_path = `/uploads/FranchiseQRpdf/${Name}_${i}.pdf`;

            // Write the PDF bytes to the file
            fs.writeFileSync(pdfFilePath, pdfBytes);

            // Create a new FranchiseQR document
            const newFranchiseQR = await new FranchiseQR({
                Name, Email, Contact1, Contact2, State, City, Area, Pin, Address, Package, IsActive, pdf: pdf_path
            }).save();

            // Push the created FranchiseQR document to the array
            createdFranchiseQRs.push(newFranchiseQR);
        }

        // Send success response with the array of created FranchiseQR documents
        res.status(200).json({
            success: true,
            isOk: true,
            data: createdFranchiseQRs,
            message: `${TotalNo} Franchise QR PDFs generated and saved successfully`
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, error: "Internal server error" });
    }
};



exports.listFranchiseQR = async (req, res) => {
  try {
    const list = await FranchiseQR.aggregate([
        {
          $lookup: {
            from: 'servicetypeschemas',
            localField: 'ServiceName', 
            foreignField: '_id',  
            as: 'serviceTypeDetails'
          }
        },
        {
          $sort: { createdAt: -1 }
        }
      ]);
    res.json(list);
  } catch (error) {
    return res.status(400).send(error);
  }
};

exports.listActiveFranchiseQR = async (req, res) => {
  try {
    const list = await FranchiseQR.aggregate([
        {
          $lookup: {
            from: 'servicetypeschemas',
            localField: 'ServiceName', 
            foreignField: '_id',  
            as: 'serviceTypeDetails'
          }
        },
        
        {
          $unwind: {
            path: "$specialitymanagements",
            preserveNullAndEmptyArrays: true,
          },
        },
        {
          $match: {
            $or: [
              {
                "specialtyInfo.0.SpecialityName": new RegExp(match, "i"),
              },
              {
                detail: new RegExp(match, "i"),
              },   {
                DoctorName: new RegExp(match, "i"),
              },   {
                specialityNameOther: new RegExp(match, "i"),
              },
            ],
          },
        },
        {
          $sort: { createdAt: -1 }
        }
      ]);
    console.log("list avi", list);
    res.json(list);
  } catch (error) {
    return res.status(400).send(error);
  }
};

exports.updateFranchiseQR = async (req, res) => {
    try {
        console.log("kokokkokokokokoko",req.file)
        let imageURL = req.file
        ? `/uploads/FranchiseQRpdf/${req.file.filename}`
          : req.body.imageURL;
          let fieldvalues = { ...req.body };
          if (imageURL != null) {
            fieldvalues.pdf = imageURL;
          }
        // let { Name, Email, Contact1, Contact2, State, City, Area, Pin, Address, Package, IsActive} = req.body;
    
        console.log("rsrsrsrsrsrsrs",imageURL);

        const update = await FranchiseQR.findOneAndUpdate(
          { _id: req.params._id },
          fieldvalues,
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

exports.removeFranchiseQR = async (req, res) => {
  try {
    const delTL = await FranchiseQR.findByIdAndDelete({
      _id: req.params._id,
    });
    res.status(200).json({ success: true,
      isOk: true,
      data: delTL,
       message: "Franchise QR PDF generated and saved successfully" });
  } catch (err) {
    res.status(400).send(err);
  }
};



exports.listFranchiseQRByParams = async (req, res) => {
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
        $match: {
          $or: [
            
            {
              Name: new RegExp(match, "i"),
            }
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

    const list = await FranchiseQR.aggregate(query);
    res.json(list);
  } catch (error) {
    console.error("Error in listFranchiseQRByParams:", error);
    res.status(500).send("Internal Server Error");
  }
};