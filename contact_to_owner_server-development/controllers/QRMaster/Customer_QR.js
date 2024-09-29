const CustomerQR = require("../../models/QRMAster/Customer_QR");
const QRCode = require('qrcode');
const { PDFDocument, rgb } = require('pdf-lib');
const path = require('path');


const fs = require('fs');

 const generateQRCode = async (data, filename) => {
  const uniqueFilename = `${filename}_${Date.now()}.png`; // Append timestamp to make the filename unique
  console.log("THis is",uniqueFilename)
  const qrCodeDir = path.join(__dirname, '../../uploads/CustomerQRpdf');

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

 
const generatePDFWithQR = async (_id) => {
  const { PDFDocument } = require('pdf-lib');
  const fs = require('fs');
  // const generateQRCode = require('./path/to/your/qrcode/generator'); // Adjust this import to match your QR code generation function path

  const pdfDoc = await PDFDocument.create();
  const page = pdfDoc.addPage();
  const { width, height } = page.getSize();

  let yOffset = height;
  let xOffset = width;

  // QR codes configuration
  const qrCodes = [
    { name: '/664b697eb47af88b434b40fb', size: 1.3, label: 'Buisness QR' },
    { name: '/664b698db47af88b434b40fd', size: 1.3, label: 'Vehical QR' },
    { name: '/664b699cb47af88b434b4101', size: 1.3, label: 'Home QR' },
    { name: '/664b6997b47af88b434b40ff', size: 0.5, label: 'Pet QR' },
    { name: '/664b23653107eed1529ef152', size: 0.5, label: 'Keychain QR' },
  ];
  const baseUrl = "http://contacttoowner.com/form";
  
  try {
    for (let i = 0; i < qrCodes.length; i++) {
      const { name, size, label } = qrCodes[i];
      const stateId = "664b697eb47af88b434b40fb"; // Example state ID

      // Construct the URL with state data
      const qrCodeData = `${baseUrl}${name}&name=${_id}`;

      // const qrCodeData = `${name}`;

      const qrCodeFilename = `${name}_${i}.png`; // Add index to the filename to make it unique
      const qrCodePath = await generateQRCode(qrCodeData, qrCodeFilename);

      const qrCodeImage = await pdfDoc.embedPng(fs.readFileSync(qrCodePath));
      const qrCodeDims = qrCodeImage.scale(size);

      // Calculate x coordinate
      let xCoordinate = (i % 2 === 0) ? (width / 4 - qrCodeDims.width / 2) : ((3 * width) / 4 - qrCodeDims.width / 2);
      if (i === 4) {
        xCoordinate = xOffset - xCoordinate;
      }
      
      // Draw the label above the QR code
      const fontSize = 12;
      const textWidth = pdfDoc.embedStandardFont('Helvetica').widthOfTextAtSize(label, fontSize);
      page.drawText(label, {
        x: xCoordinate + (qrCodeDims.width - textWidth) / 2,
        y: yOffset - fontSize - 5,
        size: fontSize,
        color: rgb(0, 0, 0),
      });

      // Draw the QR code
      page.drawImage(qrCodeImage, {
        x: xCoordinate,
        y: yOffset - qrCodeDims.height - fontSize - 10,
        width: qrCodeDims.width,
        height: qrCodeDims.height,
      });

      if (i % 2 === 1) {
        yOffset -= qrCodeDims.height + fontSize + 30; // Adjust yOffset for the next row
      }

      if (i === 3) {
        xOffset -= qrCodeDims.width;
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


 
// Controller function to create customer QR
exports.createCustomerQR = async (req, res) => {
  try {
    // Get data from request body
    let { pdf,Message, Name, Email, Contact, Contact1, Contact2, State, City, Area, Pin, Address, Package, IsActive, byAdmin,timestamps } = req.body;

    // Generate PDF with QR codes

    // Execute the aggregation pipeline to get the max InviceNo
    const pipeline = [
      {
        $group: {
          _id: null,
          maxInviceNo: { $max: "$InviceNo" }
        }
      },
      {
        $project: {
          InviceNo: { $add: ["$maxInviceNo", 1] }
        }
      }
    ];

    const [result] = await CustomerQR.aggregate(pipeline);
    console.log(result);

    // Set default value for new InviceNo
    let newInviceNo = 1;
    if (result && result.InviceNo) {
      newInviceNo = result.InviceNo;
    }

    // Determine srNo based on byAdmin value
    let newSrNo = newInviceNo;
    if (byAdmin) {
      const adminPipeline = [
        {
          $group: {
            _id: null,
            maxSrNo: { $max: "$srNo" }
          }
        },
        {
          $project: {
            srNo: { $add: ["$maxSrNo", 100000] }
          }
        }
      ];

      const [adminResult] = await CustomerQR.aggregate(adminPipeline);
      if (adminResult && adminResult.srNo) {
        newSrNo = adminResult.srNo;
      } else {
        newSrNo = 100001; // If no records exist, start from 100001
      }
    }

    // Save customer data to the database
    const newCustomerQR = await new CustomerQR({
      InviceNo: newInviceNo,
      srNo: newSrNo,
      Message,
      Name,
      Email,
      Contact1,
      Contact,
      Contact2,
      State,
      City,
      Area,
      Pin,
      Address,
      Package,
      IsActive,
      pdf
    }).save();

    // Write the PDF bytes to the file
   

    // Send success response
    res.status(200).json({
      success: true,
      isOk: true,
      data: newCustomerQR,
      message: "Customer QR PDF generated and saved successfully"
    });
    console.log(res)
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
};


exports.listCustomerQR = async (req, res) => {
  try {
    const list = await CustomerQR.aggregate([
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

exports.listActiveCustomerQR = async (req, res) => {
  try {
    const list = await CustomerQR.aggregate([
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

exports.createpdf= async(req,res)=>{

  console.log(req.params._id)
  try{
    let fieldvalues = { ...req.body };
    const pdfBytes = await generatePDFWithQR(req.params._id);
    let {Name} = req.body
    console.log(req.body.data.Name)
    // Specify the path to save the PDF file
    const fileName= `${req.body.data.Name}_${Date.now()}`
    const pdfFilePath = path.join(__dirname, `../../uploads/CustomerQRpdf/${fileName}.pdf`);
    const pdf_path = `/uploads/CustomerQRpdf/${fileName}.pdf`;
     fs.writeFileSync(pdfFilePath, pdfBytes);
     fieldvalues.pdf = pdf_path;
     const update = await CustomerQR.findOneAndUpdate(
      { _id: req.params._id },
      fieldvalues,
      { new: true }
    );
    
    res.status(200).json({
      isOk: true,
      data: update,
      message: "Customer QR updated successfully",
    });
  }
  catch (err) {
    console.error(err);
    res.status(500).json({ isOk: false, error: "Internal server error" });
  }
}

// exports.updateCustomerQR = async (req, res) => {
//   try { 
//     let imageURL = req.file
//       ? `/uploads/CustomerQRpdf/${req.file.filename}`
//       : req.body.imageURL;
    
//     // Get the current customer details from the database
//     const currentCustomer = await CustomerQR.findById(req.params._id);
//     if (!currentCustomer) {
//       return res.status(404).json({ isOk: false, error: "Customer not found" });
//     }

//     let fieldvalues = { ...req.body };
//     if (imageURL != null) {
//       fieldvalues.pdf = imageURL;
//     }

//     // Check if any of the relevant fields have changed
//     const { Name, Contact, IsActive } = req.body;
//     let shouldRegeneratePDF = false;
    
//     if (Name && Name !== currentCustomer.Name) {
//       shouldRegeneratePDF = true;
//     }
//     if (Contact && Contact !== currentCustomer.Contact) {
//       shouldRegeneratePDF = true;
//     }
//     if (IsActive !== undefined && IsActive !== currentCustomer.IsActive) {
//       shouldRegeneratePDF = true;
//     }

//     if (shouldRegeneratePDF) {
//       // Generate a new PDF with the QR code
//       const pdfBytes = await generatePDFWithQR(Name || currentCustomer.Name, Contact || currentCustomer.Contact, IsActive !== undefined ? IsActive : currentCustomer.IsActive);
      
//       // Specify the path to save the new PDF file
//       const pdfFilePath = path.join(__dirname, `../../uploads/CustomerQRpdf/${Name || currentCustomer.Name}_${Date.now()}.pdf`);
//       const pdf_path = `/uploads/CustomerQRpdf/${Name || currentCustomer.Name}_${Date.now()}.pdf`;
      
//       // Write the new PDF bytes to the file
//       fs.writeFileSync(pdfFilePath, pdfBytes);
      
//       // Update the fieldvalues with the new PDF path
//       fieldvalues.pdf = pdf_path;
//     }

//     // Update the customer record in the database
//     const update = await CustomerQR.findOneAndUpdate(
//       { _id: req.params._id },
//       fieldvalues,
//       { new: true }
//     );

//     res.status(200).json({
//       isOk: true,
//       data: update,
//       message: "Customer QR updated successfully",
//     });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ isOk: false, error: "Internal server error" });
//   }
// };
exports.updateCustomerQR = async (req, res) => {
  try {
      console.log("kokokkokokokokoko",req.file)
      let imageURL = req.file
      ? `/uploads/CustomerQRpdf/${req.file.filename}`
        : req.body.imageURL;
        let fieldvalues = { ...req.body };
        if (imageURL != null) {
          fieldvalues.pdf = imageURL;
        }
      // let { Name, Email, Contact1, Contact2, State, City, Area, Pin, Address, Package, IsActive} = req.body;
  
      console.log("rsrsrsrsrsrsrs",imageURL);

      const update = await CustomerQR.findOneAndUpdate(
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


exports.removeCustomerQR = async (req, res) => {
  try {
    const delTL = await CustomerQR.findByIdAndDelete({
      _id: req.params._id,
    });
    res.status(200).json({ success: true,
      isOk: true,
      data: delTL,
       message: "Customer QR PDF generated and saved successfully" });
  } catch (err) {
    res.status(400).send(err);
  }
};



exports.listCustomerQRByParams = async (req, res) => {
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

    const list = await CustomerQR.aggregate(query);
    res.json(list);
  } catch (error) {
    console.error("Error in listCustomerQRByParams:", error);
    res.status(500).send("Internal Server Error");
  }
};

exports.getCustomerQRById=async(req,res)=>{
  try{
const specificuser=await CustomerQR.findOne({_id:req.params}).exec();
res.status(200).send(specificuser);

  }
  catch(error){
    console.log("Error in Fetching CustomerQR User",error);
    res.status(500).send(error)
  }
}