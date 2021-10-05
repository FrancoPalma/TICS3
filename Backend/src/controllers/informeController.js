const pool = require('../config/database.js');
const PDF = require('pdfkit')
const fs = require('fs');
const { json } = require('body-parser');

informeController = {}

informeController.postInforme = async (req, res) => {

  let rut_infante = req.body.rut_infante;
  let rut_usuario = req.body.rut_usuario;
  let fecha = Date.now();
  let completado = req.body.completado;

  let infante = await pool.query('INSERT INTO informe (rut_infante, rut_usuario, fecha, completado)  VALUES ($1, $2, $3, $4)', [rut_infante, rut_usuario, fecha, completado], (err, result) => {
    if(err){return res.sendStatus(404)}
    return res.json(result.rows[0])
  })
  infante = infante.rows[0]
  
};

informeController.getInforme = async (req, res) => {

  let id_informe = req.params.id;

  pool.query('BEGIN')

  let infante = await pool.query('SELECT informe.rut_infante, infante.nombre FROM informe, infante WHERE informe.rut_infante = infante.rut AND informe.id = $1', [id_informe])
  infante = infante.rows[0]

  let informe = await pool.query('SELECT id, fecha FROM informe WHERE rut_infante = $1', [infante.rut])
  informe = informe.rows[0]

  let metodologia = await pool.query('SELECT id, descripcion FROM metodologia WHERE id_informe = $1', [informe.id])
  informe = metodologia.rows[0]  
  
  pool.query('COMMIT', (err) => {
    if(err){return res.sendStatus(404)}
    else{

    const doc = new PDF({bufferPages: true});
    
    const stream = res.writeHead(200, {
        'Content-Type': 'application/pdf',
        'Content-disposition': 'attachment;filename=informe.pdf'
    });

    doc.on('data', (chunk) => stream.write(chunk),);
    doc.on('end', () => stream.end());

    doc.fontSize(20).text('Evaluación de Terapia Ocupacional', {align: 'center'});
    doc.fontSize(20).text(infante.rut_infante, {align: 'center'});
    doc.fontSize(20).text(infante.nombre, {align: 'center'});

    doc
      .fontSize(12)
      .text(
        `Lorem ipsum dolor, sit amet consectetur adipisicing elit. Maiores, saepe.`
      );
    doc.end();


  }
})

};

module.exports = informeController;