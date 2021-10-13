const pool = require('../config/database.js');
const PDF = require('pdfkit');
const { options } = require('pdfkit');
const fs = require('fs');
const { send } = require('process');


informeController = {}

informeController.getCrearInforme = async (req, res) => {

  /*let rut_infante = req.body.rut_infante;
  let rut_usuario = req.body.rut_usuario;
  let fecha = Date.now();
  let completado = req.body.completado;*/

  let rut_infante = '12345678-9';
  let rut_usuario = 1;
  let fecha = new Date().toISOString().slice(0, 10);
  let completado = false;

  await pool.query('INSERT INTO informe (rut_infante, rut_usuario, fecha, completado)  VALUES ($1, $2, $3, $4)', [rut_infante, rut_usuario, fecha, completado], (err, result) => {
    if(err){return res.sendStatus(404)}
    console.log(result)
    return res.json(result.rows[0]);
  })  
};

informeController.postMetodologia = async (req, res) => {

  let id_informe = req.params.id_informe;
  let descripcion = req.body.completado;

  await pool.query('INSERT INTO metodologia (id_informe, descripcion)  VALUES ($1, $2)', [id_informe, descripcion], (err, result) => {
    if(err){return res.sendStatus(404)}
    return res.sendStatus(200);
  })  
};

informeController.postEvaluacion = async (req, res) => {

  let id_informe = req.params.id_informe;
  let nombre = req.body.nombre;

  await pool.query('INSERT INTO evaluacion (id_informe, nombre)  VALUES ($1, $2)', [id_informe, nombre], (err, result) => {
    if(err){return res.sendStatus(404)}
    return res.sendStatus(200);
  })  
};

informeController.postObjetivo = async (req, res) => {

  let id_informe = req.params.id_informe;
  let nombre = req.body.nombre;

  await pool.query('INSERT INTO objetivo (id_informe, nombre)  VALUES ($1, $2)', [id_informe, nombre], (err, result) => {
    if(err){return res.sendStatus(404)}
    return res.sendStatus(200);
  })  
};

informeController.postAnalisis = async (req, res) => {

  let id_informe = req.params.id_informe;
  let conclusion = req.body.conclusion;
  let recomendacion = req.body.recomendacion;

  await pool.query('INSERT INTO analisis (id_informe, conclusion, recomendacion)  VALUES ($1, $2, $3)', [id_informe, conclusion, recomendacion], (err, result) => {
    if(err){return res.sendStatus(404)}
    return res.sendStatus(200);
  })  
};

informeController.postSesion = async (req, res) => {

  let id_informe = req.params.id_informe;
  let nombre = req.body.nombre;
  let descripcion = req.body.descripcion;

  await pool.query('SELECT metodologia.id FROM informe, metodologia WHERE informe.id = metodologia.id_informe AND informe.id= $1', [id_informe], async (err, result) => {
    if(err){return res.sendStatus(400)}
    id_metodologia = result.rows[0];
    await pool.query('INSERT INTO sesion (id_metodologia, nombre, descripcion) VALUES ($1, $2, $3)', [id_metodologia, nombre, descripcion], (err, result) => {
      if(err){return res.sendStatus(404)}
      return res.sendStatus(200);
    })  
  })
};

informeController.postCriterio = async (req, res) => {

  let id_informe = req.params.id_informe;
  let nombre = req.body.nombre;
  let descripcion = req.body.descripcion;
  let puntaje = req.body.puntaje;

  await pool.query('SELECT evaluacion.id FROM informe, evaluacion WHERE informe.id = rvaluacion.id_informe AND informe.id= $1', [id_informe], async (err, result) => {
    if(err){return res.sendStatus(400)}
    id_evaluacion = result.rows[0];
    await pool.query('INSERT INTO criterio (id_evaluacion, nombre, descripcion, puntaje) VALUES ($1, $2, $3, $4)', [id_evaluacion, nombre, descripcion, puntaje], (err, result) => {
      if(err){return res.sendStatus(404)}
      return res.sendStatus(200);
    })  
  })
};

informeController.postSesion = async (req, res) => {

  let id_informe = req.params.id_informe;
  let nombre = req.body.nombre;
  let descripcion = req.body.descripcion;

  await pool.query('SELECT actividad.id FROM informe, actividad WHERE informe.id = actividad.id_informe AND informe.id= $1', [id_informe], async (err, result) => {
    if(err){return res.sendStatus(400)}
    id_objetivo = result.rows[0];
    await pool.query('INSERT INTO actividad (id_objetivo, descripcion) VALUES ($1, $2)', [id_objetivo, descripcion], (err, result) => {
      if(err){return res.sendStatus(404)}
      return res.sendStatus(200);
    })  
  })
};

informeController.getInforme = async (req, res) => {

  let id_informe = req.params.id;

  pool.query('BEGIN')

  let infante = await pool.query('SELECT informe.rut_infante, infante.nombre FROM informe, infante WHERE informe.rut_infante = infante.rut AND informe.id = $1', [id_informe])
  infante = infante.rows[0]

  let informe = await pool.query('SELECT id, fecha FROM informe WHERE rut_infante = $1', [infante.rut])
  informe = informe.rows[0]

  let metodologia = await pool.query('SELECT id, descripcion FROM metodologia WHERE id_informe = $1', [informe.id])
  metodologia = metodologia.rows[0]  
 
  let evaluacion = await pool.query('SELECT id, nombre FROM metodologia WHERE id_informe = $1', [informe.id])
  evaluacion = evaluacion.rows[0]  

  let objetivo = await pool.query('SELECT id, nombre FROM objetivo WHERE id_informe = $1', [informe.id])
  objetivo = objetivo.rows[0]
  
  let analisis = await pool.query('SELECT conclusion, recomendacion FROM analisis WHERE id_informe = $1', [informe.id])
  analisis = analisis.rows[0]

  let sesion = await pool.query('SELECT nombre, descripcion FROM sesion WHERE id_metodologia = $1', [metodologia.id])
  sesion = sesion.rows[0]

  let criterio = await pool.query('SELECT nombre, puntaje FROM criterio WHERE id_evaluacion = $1', [evaluacion.id])
  criterio = criterio.rows[0]

  let actividad = await pool.query('SELECT descripcion FROM actividad WHERE descripcion = $1', [objetivo.id])
  actividad = actividad.rows[0]  

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

    doc.fontSize(12).text(infante.nombre, {align: 'center'});
      
    doc
      .fontSize(12)
      .text(
        `Lorem ipsum dolor, sit amet consectetur adipisicing elit. Maiores, saepe.`
      );
    doc.end();


    }
  });

};

const table = {
  title: "Title",
  subtitle: "Subtitle",
  headers: ["Objetivos", "Actividades"],
  rows: [
    ["", "12%", "+1.12%"],
    ["France", "67%", "-0.98%"],
    ["England", "33%", "+4.44%"],
  ],
};

informeController.getInformePrueba = async (req, res) => {

    const doc = new PDF({bufferPages: true});
    
    const stream = res.writeHead(200, {
        'Content-Type': 'application/pdf',
        'Content-disposition': 'attachment;filename=informe.pdf'
    });

    doc.on('data', (chunk) => stream.write(chunk),);
    doc.on('end', () => stream.end(), (err) => {
      if(err){return res.sendStatus(400)}
    });

    doc.fontSize(20).text('Evaluación de Terapia Ocupacional\n', {align: 'center'});
    doc.fontSize(12).text('\n', {align: 'right'})
    doc.fontSize(12).font('Helvetica-Bold').text('Nombre: ', {continued: true}).font('Helvetica').text('Francoco Chupa los Cocos');
    doc.font('Helvetica-Bold').text('RUT: ', {continued: true}).font('Helvetica').text('12345678-9');
    doc.font('Helvetica-Bold').text('Fecha: ', {continued: true}).font('Helvetica').text('12-10-2021');
    doc.text('\n')

    doc.fontSize(18).font('Helvetica-Bold').text('Metodología de evaluación', {align:'center'})
    doc.fontSize(12).text('\n')
    doc.fontSize(12).font('Helvetica').text('Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed varius ante metus, vitae sollicitudin urna vulputate vitae. Proin lacinia tortor nec nisi convallis, pulvinar aliquet turpis ultrices. Praesent convallis ornare nisl eu pharetra. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nam ac elit nec risus congue scelerisque. Sed sagittis, sem scelerisque luctus commodo, libero velit egestas lorem, molestie tempus turpis eros nec odio. In pellentesque pretium vulputate. In et arcu tempus, tincidunt nisl sit amet, finibus libero. Aenean vitae diam id turpis suscipit ultricies vitae bibendum nulla.', {align: 'justify'});
    doc.text('\n');

    doc.fontSize(12).text('\n')
    doc.fontSize(14).font('Helvetica-Bold').text('Sesiones');
    doc.fontSize(12).text('\n');
    for(let i=0; i<3; i++){
      doc.font('Helvetica-Bold').text('Sesión '+i+':', {continued: true}).font('Helvetica').text('Bla bla bla');
      doc.text('\n')
    }

    doc.addPage()
    doc.fontSize(18).font('Helvetica-Bold').text('Evaluaciones', {align:'center'})
    for(let i=0; i<2; i++){
      doc.text('\n');
      doc.fontSize(14).font('Helvetica-Bold').text('Evaluacion ' + i);
      doc.fontSize(12).text('\n');
      for(let i=0; i<3; i++){
        doc.font('Helvetica-Bold').text('Criterio ' + i + ': ', {continued: true}).font('Helvetica').text(i*2)
        doc.text('Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed varius ante metus, vitae sollicitudin urna vulputate vitae. Proin lacinia tortor nec nisi convallis, pulvinar aliquet turpis ultrices. Praesent convallis ornare nisl eu pharetra. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nam ac elit nec risus congue scelerisque. Sed sagittis, sem scelerisque luctus commodo, libero velit egestas lorem, molestie tempus turpis eros nec odio. In pellentesque pretium vulputate. In et arcu tempus, tincidunt nisl sit amet, finibus libero. Aenean vitae diam id tur', {align: 'justify'})
        doc.text('\n')
      }
    }

    doc.addPage()
    doc.fontSize(18).font('Helvetica-Bold').text('Análisis y conclusión de evaluaciones', {align:'center'})
    doc.text('\n');
    doc.fontSize(12).font('Helvetica').text('Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed varius ante metus, vitae sollicitudin urna vulputate vitae. Proin lacinia tortor nec nisi convallis, pulvinar aliquet turpis ultrices. Praesent convallis ornare nisl eu pharetra. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nam ac elit nec risus congue scelerisque. Sed sagittis, sem scelerisque luctus commodo, libero velit egestas lorem, molestie tempus turpis eros nec odio. In pellentesque pretium vulputate. In et arcu tempus, tincidunt nisl sit amet, finibus libero. Aenean vitae diam id turpis suscipit ultricies vitae bibendum nulla.', {align: 'justify'});
    doc.text('\n');

    doc.addPage()
    doc.fontSize(18).font('Helvetica-Bold').text('Plan de intervención', {align:'center'})

    for(let i=0; i<2; i++){
      doc.text('\n');
      doc.fontSize(14).font('Helvetica-Bold').text('Objetivo ' + i);
      doc.fontSize(12).font('Helvetica').text('orem ipsum dolor sit amet, consectetur adipiscing elit. Sed varius ante metus, vitae sollicitudin urna vulputate vitae. Proin lacinia tortor nec nisi convallis, pulvinar aliquet turpis ultrices. Praesent convallis ornare nisl eu pharetra. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nam ac elit nec risus congue scelerisque. Sed sagittis, sem scelerisque luctus commodo, libero velit egestas lorem, molestie tempus turpis eros nec odio. In pellentesque pretium vulputate. In et arcu tempus, tincidunt nisl sit amet, finibus libero. Aenean vitae diam id turpis suscipit ultricies vitae bibendum n', {align:'justify'});
      doc.fontSize(12).text('\n');
      doc.fontSize(12).font('Helvetica-Bold').text('Actividades respectivas:');
      doc.font('Helvetica').list(['rem, molestie tempus turpis eros nec odio. In pellencu tem','rem, molestie tempus turpis eros nec odio. In pellencu tem', 'rem, molestie tempus turpis eros nec odio. In pellencu tem'], )
      doc.text('\n');
    }

    doc.addPage()
    doc.fontSize(18).font('Helvetica-Bold').text('Recomendaciones para el hogar', {align:'center'})
    doc.fontSize(12).text('\n')
    doc.fontSize(12).font('Helvetica').text('Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed varius ante metus, vitae sollicitudin urna vulputate vitae. Proin lacinia tortor nec nisi convallis, pulvinar aliquet turpis ultrices. Praesent convallis ornare nisl eu pharetra. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nam ac elit nec risus congue scelerisque. Sed sagittis, sem scelerisque luctus commodo, libero velit egestas lorem, molestie tempus turpis eros nec odio. In pellentesque pretium vulputate. In et arcu tempus, tincidunt nisl sit amet, finibus libero. Aenean vitae diam id turpis suscipit ultricies vitae bibendum nulla.', {align: 'justify'});
    doc.text('\n');

    doc.end();


  }

module.exports = informeController;