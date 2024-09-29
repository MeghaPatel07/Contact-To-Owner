const generatePDFWithQR = async (dataList) => {
  const pdfDoc = await PDFDocument.create();
  const page = pdfDoc.addPage();
  const { width, height } = page.getSize();

  let yOffset = height - 50;

  for (const data of dataList) {
    const qrCodeFilename = `${data}.png`;
    await generateQRCode(data, qrCodeFilename);

    const qrCodeImage = await pdfDoc.embedPng(fs.readFileSync(qrCodeFilename));
    const qrCodeDims = qrCodeImage.scale(0.5);

    page.drawImage(qrCodeImage, {
      x: width / 2 - qrCodeDims.width / 2,
      y: yOffset - qrCodeDims.height,
      width: qrCodeDims.width,
      height: qrCodeDims.height,
    });

    fs.unlinkSync(qrCodeFilename); // Delete temporary QR code image file

    yOffset -= qrCodeDims.height + 20; // Adjust yOffset for the next QR code
  }

  const pdfBytes = await pdfDoc.save();
  return pdfBytes;
};
