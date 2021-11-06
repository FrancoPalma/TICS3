const pool = require('../config/database.js');
const fs = require('fs')
const path = require('path')
var htmlToPdf = require('html-to-pdf');

informeController = {}

informeController.postGuardarInforme = async (req, res) => {
  let rut_infante = req.body.rut_infante;
  let contenido = req.body.contenido;
  await pool.query('BEGIN', async (err) => {
    if(err){return res.sendStatus(404)}
    await pool.query('INSERT INTO informe(rut_infante, rut_usuario) VALUES ($1, $2) RETURNING id', (err, result) => {
      if(err){return res.sendStatus(404)}
      
      fs.writeFile(__dirname, '../public/informes/informe' + result.rows[0].id + '.pdf', contenido, (err) => {
        if (err) {
          pool.query('ROLLBACK')
          return res.sendStatus(404)
        }
        htmlToPdf.convertHTMLString(contenido, path.join(__dirname, '../public/informes/informe' + result.rows[0].id + '.pdf'), async (err) => {
          if (err) {
            pool.query('ROLLBACK')
            return res.sendStatus(404)
          }
          await pool.query('COMMIT', (err) => {
            if(err){return res.sendStatus(404)}
            return res.sendStatus(200);
          })

        });
      })
    })
  })
};

informeController.getVerInforme = async (req, res) => {
  let rut_infante = req.body.rut_infante;
  fs.readFile(path.join(__dirname, '../public/informes/informe'+ rut_infante +'.pdf') , function (err,data){
    if(err){return res.sendStatus(404);}
    res.contentType("application/pdf");
    res.send(data);
  });
}

module.exports = informeController;