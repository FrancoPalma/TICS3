const pool = require('../config/database.js');
const PDF = require('pdfkit')
const fs = require('fs');

informeController = {}

informeController.getInforme = async (req, res) => {

    let result = await pool.query('SELECT nombre FROM infante')

    result = result.rows[0]
    const doc = new PDF({bufferPages: true});
  
    const stream = res.writeHead(200, {
        'Content-Type': 'application/pdf',
        'Content-disposition': 'attachment;filename=informe.pdf'
    });

    doc.on('data', (chunk) => stream.write(chunk),);
    doc.on('end', () => stream.end());

    doc.fontSize(20).text('Evaluación de Terapia Ocupacional', {align: 'center'});

    doc.fontSize(20).text(result.nombre, {align: 'center'});

    doc
      .fontSize(12)
      .text(
        `Lorem ipsum dolor, sit amet consectetur adipisicing elit. Maiores, saepe.`
      );
    doc.end();

};

module.exports = informeController;