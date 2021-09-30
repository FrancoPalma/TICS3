const pool = require('../config/database.js');
const PDF = require('pdfkit')
const fs = require('fs');

informeController = {}

informeController.getInforme = (req, res) => {

    const doc = new PDF({bufferPages: true});
  
    const stream = res.writeHead(200, {
        'Content-Type': 'application/pdf',
        'Content-disposition': 'attachment;filename=informe.pdf'
    });

    doc.on('data', (chunk) => stream.write(chunk),);
    doc.on('end', () => stream.end());

    doc.fontSize(20).text(`A heading`);

    doc
      .fontSize(12)
      .text(
        `Lorem ipsum dolor, sit amet consectetur adipisicing elit. Maiores, saepe.`
      );
    doc.end();

};

module.exports = informeController;