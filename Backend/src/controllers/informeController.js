const pool = require('../config/database.js');
const PDF = require('pdfkit');
const fs = require('fs')
const path = require('path')
const { options, list } = require('pdfkit');


informeController = {}

informeController.postInforme = async (req, res) => {

  /*let rut_infante = req.body.rut_infante;
  let rut_usuario = req.body.rut_usuario;
  let fecha = Date.now();
  let completado = req.body.completado;*/

  let rut_infante = '12345678-9';
  let rut_usuario = 1;
  let fecha = new Date().toISOString().slice(0, 10);
  let completado = false;

  await pool.query('INSERT INTO informe (rut_infante, rut_usuario, fecha, completado)  VALUES ($1, $2, $3, $4) RETURNING id', [rut_infante, rut_usuario, fecha, completado], (err, result) => {
    if(err){return res.sendStatus(404)}
    return res.json(result.rows[0]);
  })  
};

informeController.postMetodologia = async (req, res) => {

  let id_informe = req.params.id_informe;
  let descripcion = req.body.descripcion;

  await pool.query('INSERT INTO metodologia (id_informe, descripcion)  VALUES ($1, $2)', [id_informe, descripcion], (err, result) => {
    if(err){return res.sendStatus(404)}
    return res.sendStatus(200);
  })  
};

informeController.postEvaluacion = async (req, res) => {

  let id_informe = req.params.id_informe;
  let nombre = req.body.nombre;
  console.log("Nombre Evaluación")
  console.log(nombre)

  await pool.query('INSERT INTO evaluacion (id_informe, nombre)  VALUES ($1, $2)', [id_informe, nombre], (err, result) => {
    if(err){return res.sendStatus(404)}
    return res.sendStatus(200);
  })  
};

informeController.postObjetivo = async (req, res) => {

  let id_informe = req.params.id_informe;
  let nombre = req.body.nombre;
  console.log(nombre)
  await pool.query('INSERT INTO objetivo (id_informe, nombre)  VALUES ($1, $2)', [id_informe, nombre], (err, result) => {
    if(err){return res.sendStatus(404)}
    return res.sendStatus(200);
  })  
};

informeController.postAnalisis = async (req, res) => {

  let id_informe = req.params.id_informe;
  let conclusion = req.body.conclusion;
  let recomendacion = req.body.recomendacion;
  console.log("Analisis")
  console.log(conclusion)
  console.log(recomendacion)

  await pool.query('INSERT INTO analisis (id_informe, conclusion, recomendacion)  VALUES ($1, $2, $3)', [id_informe, conclusion, recomendacion], (err, result) => {
    if(err){return res.sendStatus(404)}
    return res.sendStatus(200);
  })  
};

informeController.postSesion = async (req, res) => {

  let id_informe = req.params.id_informe;
  let nombre = req.body.nombre;
  let descripcion = req.body.descripcion;

  console.log("Sesión")
  console.log(nombre)
  console.log(descripcion)

  await pool.query('SELECT metodologia.id FROM informe, metodologia WHERE informe.id = metodologia.id_informe AND informe.id= $1', [id_informe], async (err, result) => {
    if(err){return res.sendStatus(400)}
    id_metodologia = result.rows[0].id;
    console.log(id_metodologia)
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

  console.log("Criterios")
  console.log(nombre)
  console.log(descripcion)
  console.log(puntaje)
  await pool.query('SELECT evaluacion.id FROM informe, evaluacion WHERE informe.id = evaluacion.id_informe AND informe.id= $1', [id_informe], async (err, result) => {
    if(err){return res.sendStatus(400)}
    id_evaluacion = result.rows[0];
    await pool.query('INSERT INTO criterio (id_evaluacion, nombre, descripcion, puntaje) VALUES ($1, $2, $3, $4)', [id_evaluacion, nombre, descripcion, puntaje], (err, result) => {
      if(err){return res.sendStatus(404)}
      return res.sendStatus(200);
    })  
  })
};

informeController.postActividad = async (req, res) => {

  let id_informe = req.params.id_informe;
  let descripcion = req.body.descripcion;
  console.log("Actividad")
  console.log(descripcion)

  await pool.query('SELECT actividad.id FROM informe, actividad WHERE informe.id = actividad.id_informe AND informe.id= $1', [id_informe], async (err, result) => {
    if(err){return res.sendStatus(400)}
    id_objetivo = result.rows[0];
    await pool.query('INSERT INTO actividad (id_objetivo, descripcion) VALUES ($1, $2)', [id_objetivo, descripcion], (err, result) => {
      if(err){return res.sendStatus(404)}
      return res.sendStatus(200);
    })  
  })
};

informeController.prueba = async (req, res) => {
  pool.query('BEGIN', async (err) => {
    if(err){return res.sendStatus(404)}
    lista = []
    for(let i = 0; i < 3; i++){
      evaluacion = await pool.query('INSERT INTO infante(id_jardin, rut, nombre, fecha_nacimiento) VALUES ($1,$2,$3, $4) RETURNING rut', [1, i.toString(), 'Juan', '2021-10-11']);
      console.log(evaluacion.rows)
      lista.push(evaluacion.rows)
    }
    pool.query('COMMIT', (err) => {
      if(err){return res.sendStatus(404)}
      return res.json(lista)
    }) 
  })
}

informeController.getVisualizarInforme = async (req, res) => {

  let id_informe = 14;

  let infante = await pool.query('SELECT informe.rut_infante, infante.nombre FROM informe, infante WHERE informe.id = $1', [id_informe])
  infante = infante.rows[0]
  
  let archivo = path.join(__dirname, '../public/informes/informe'+infante.rut_infante+'.pdf')

  const doc = new PDF({bufferPages: true});

  /*const stream = res.writeHead(200, {
      'Content-Type': 'application/pdf',
      'Content-disposition': 'attachment;filename=informe.pdf'
  });

  doc.on('data', (chunk) => stream.write(chunk),);
  doc.on('end', () => stream.end(), (err) => {
    if(err){return res.sendStatus(400)}
  });*/

  writeStream = fs.createWriteStream(archivo) 

  doc.pipe(writeStream);

  doc.fontSize(20).text('Evaluación de Terapia Ocupacional\n', {align: 'center'});
  doc.fontSize(12).text('\n', {align: 'right'})
  doc.fontSize(12).font('Helvetica-Bold').text('Nombre: ', {continued: true}).font('Helvetica').text(infante.nombre);
  doc.font('Helvetica-Bold').text('RUT: ', {continued: true}).font('Helvetica').text(infante.rut_infante);
  doc.font('Helvetica-Bold').text('Fecha: ', {continued: true}).font('Helvetica').text(informe.fecha);
  doc.text('\n')

  let metodologia = await pool.query('SELECT metodologia.descripcion as metodologia, ARRAY_AGG(sesion.nombre) as nombre, ARRAY_AGG(sesion.descripcion) as descripcion FROM metodologia, sesion WHERE sesion.id_metodologia = metodologia.id AND metodologia.id_informe = $1 GROUP BY metodologia.descripcion', [id_informe])
  metodologia = metodologia.rows[0];

  doc.fontSize(18).font('Helvetica-Bold').text('Metodología de evaluación', {align:'center'})
  doc.fontSize(12).text('\n')
  doc.fontSize(12).font('Helvetica').text(metodologia.metodologia, {align: 'justify'});
  doc.text('\n');

  doc.fontSize(12).text('\n')
  doc.fontSize(14).font('Helvetica-Bold').text('Sesiones');
  doc.fontSize(12).text('\n');
  for(let i=0; i< metodologia.nombre.length; i++){
    doc.font('Helvetica-Bold').text(metodologia.nombre[i]+': ', {continued: true}).font('Helvetica').text(metodologia.descripcion[i]);
    doc.text('\n')
  }

  let evaluacion = await pool.query('SELECT evaluacion.id, evaluacion.nombre, ARRAY_AGG(criterio.nombre) as criterio, ARRAY_AGG(criterio.descripcion) as descripcion, ARRAY_AGG(criterio.puntaje) as puntaje FROM evaluacion, criterio WHERE evaluacion.id = criterio.id_evaluacion AND evaluacion.id_informe = $1 GROUP BY evaluacion.id, evaluacion.nombre', [id_informe])
  evaluacion = evaluacion.rows

  doc.addPage()
  doc.fontSize(18).font('Helvetica-Bold').text('Evaluaciones', {align:'center'})
  for(let i=0; i<evaluacion.length; i++){
    doc.text('\n');
    doc.fontSize(14).font('Helvetica-Bold').text(evaluacion[i].nombre);
    doc.fontSize(12).text('\n');
    for(let j=0; j<evaluacion[i].criterio.length; j++){
      doc.font('Helvetica-Bold').text(evaluacion[i].criterio[j] + ': ', {continued: true}).font('Helvetica').text(evaluacion[i].puntaje[j])
      doc.text('Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed varius ante metus, vitae sollicitudin urna vulputate vitae. Proin lacinia tortor nec nisi convallis, pulvinar aliquet turpis ultrices. Praesent convallis ornare nisl eu pharetra. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nam ac elit nec risus congue scelerisque. Sed sagittis, sem scelerisque luctus commodo, libero velit egestas lorem, molestie tempus turpis eros nec odio. In pellentesque pretium vulputate. In et arcu tempus, tincidunt nisl sit amet, finibus libero. Aenean vitae diam id tur', {align: 'justify'})
      doc.text('\n')
    }
  }

  let analisis = await pool.query('SELECT conclusion, recomendacion FROM analisis WHERE id_informe = $1', [id_informe])
  analisis = analisis.rows[0]
  
  doc.addPage()
  doc.fontSize(18).font('Helvetica-Bold').text('Análisis y conclusión de evaluaciones', {align:'center'})
  doc.text('\n');
  doc.fontSize(12).font('Helvetica').text(analisis.conclusion, {align: 'justify'});
  doc.text('\n');

  let objetivo = await pool.query('SELECT objetivo.id, objetivo.descripcion, ARRAY_AGG(actividad.descripcion) as actividad FROM objetivo, actividad WHERE objetivo.id = actividad.id_objetivo AND objetivo.id_informe = $1 GROUP BY objetivo.id', [id_informe])
  objetivo = objetivo.rows 
 
  doc.addPage()
  doc.fontSize(18).font('Helvetica-Bold').text('Plan de intervención', {align:'center'})
  for(let i=0; i<objetivo.length; i++){
    doc.text('\n');
    doc.fontSize(14).font('Helvetica-Bold').text('Objetivo ' + i);
    doc.fontSize(12).font('Helvetica').text(objetivo.descripcion, {align:'justify'});
    doc.fontSize(12).text('\n');
    doc.fontSize(12).font('Helvetica-Bold').text('Actividades respectivas:');
    doc.font('Helvetica').list(objetivo[i].actividad, )
    doc.text('\n');
  }

  doc.addPage()
  doc.fontSize(18).font('Helvetica-Bold').text('Recomendaciones para el hogar', {align:'center'})
  doc.fontSize(12).text('\n')
  doc.fontSize(12).font('Helvetica').text(analisis.recomendacion, {align: 'justify'});
  doc.text('\n');

  doc.end()

  writeStream.on('finish', function () {
    fs.readFile(archivo , function (err,data){
      if(err){return res.sendStatus(404);}
      res.contentType("application/pdf");
      res.send(data);
    });
  })

};

informeController.postEliminarInforme = (req,res) => {
  let id_informe = req.params.id_informe;

  pool.query('BEGIN', (err) => {
    if(err){return res.sendStatus(404)}
    pool.query('DELETE FROM sesion WHERE sesion.id_metodologia = (SELECT metodologia.id FROM metodologia WHERE metodologia.id_informe = $1)', [id_informe], (err) => {
      if(err){return res.sendStatus(404)}
      console.log('sesion delete')
      pool.query('DELETE FROM metodologia WHERE metodologia.id_informe = $1', [id_informe], (err) => {
        if(err){return res.sendStatus(404)}
        console.log('metodologia delete')
        pool.query('DELETE FROM criterio WHERE criterio.id_evaluacion IN (SELECT evaluacion.id FROM evaluacion WHERE evaluacion.id_informe = $1)', [id_informe], (err) => {
          if(err){return res.sendStatus(404)}
          console.log('criterio delete')
          pool.query('DELETE FROM evaluacion WHERE evaluacion.id_informe = $1', [id_informe], (err) =>{
            if(err){return res.sendStatus(404)}
            console.log('evaluacion delete')
            pool.query('DELETE FROM actividad WHERE actividad.id_objetivo IN (SELECT objetivo.id FROM objetivo WHERE objetivo.id_informe = $1)', [id_informe], (err) => {
              if(err){return res.sendStatus(404)}
              console.log('actividad delete')
              pool.query('DELETE FROM objetivo WHERE objetivo.id_informe = $1', [id_informe], (err) => {
                if(err){return res.sendStatus(404)}
                console.log('objetivo delete')
                pool.query('DELETE FROM analisis WHERE analisis.id_informe = $1', [id_informe], (err) => {
                  if(err){return res.sendStatus(404)}
                  console.log('analisis delete')
                  pool.query('DELETE FROM informe WHERE informe.id = $1', [id_informe], (err) => {
                    if(err){return res.sendStatus(404)}
                    console.log('informe delete')
                    pool.query('COMMIT', (err) => {
                      if(err){return res.sendStatus(404);}
                      return res.sendStatus(200)
                    })
                  });
                });
              });
            });
          });
        });
      });
    });
  })

}

informeController.getEliminarInforme = (req, res) => {
  res.render('prueba')
}

//-----------------VER----------------------

informeController.getVerInforme = (req, res) => {
  let id_informe = req.params.id_informe;

  pool.query('SELECT id, fecha, completado FROM informe WHERE id = $1', [id_informe], (err, result) => {
    if(err){return res.sendStatus(404)}
    let informe = result.rows[0];
    return res.json(informe)
  })
}

informeController.getVerMetodologia = (req, res) => {
  let id_informe = req.params.id_informe;

  pool.query('SELECT id, descripcion FROM metodologia WHERE id_informe = $1', [id_informe], (err, result) => {
    if(err){return res.sendStatus(404)}
    let metodologia = result.rows;
    return res.json(metodologia)
  })
}

informeController.getVerSesion = (req, res) => {
  let id_informe = req.params.id_informe;

  pool.query('SELECT sesion.id, sesion.nombre, sesion.descripcion FROM sesion, metodologia WHERE sesion.id_metodologia = metodologia.id AND metodologia.id_informe = $1', [id_informe], (err, result) => {
    if(err){return res.sendStatus(404)}
    let sesion = result.rows;
    return res.json(sesion)
  })
}

informeController.getVerEvaluacion = (req, res) => {
  let id_informe = req.params.id_informe;

  pool.query('SELECT id, nombre FROM evaluacion WHERE id_informe = $1', [id_informe], (err, result) => {
    if(err){return res.sendStatus(404)}
    let evaluacion = result.rows;
    return res.json(evaluacion)
  })
}

informeController.getVerCriterio = (req, res) => {
  let id_informe = req.params.id_informe;

  pool.query('SELECT criterio.id, criterio.nombre, criterio.descripcion, criterio.puntaje FROM criterio, evaluacion WHERE criterio.id_evaluacion = evaluacion.id AND evaluacion.id_informe = $1', [id_informe], (err, result) => {
    if(err){return res.sendStatus(404)}
    let evaluacion = result.rows;
    return res.json(criterio)
  })
}

informeController.getVerObjetivo = (req, res) => {
  let id_informe = req.params.id_informe;

  pool.query('SELECT id, descripcion FROM objetivo WHERE id_informe = $1', [id_informe], (err, result) => {
    if(err){return res.sendStatus(404)}
    let objetivo = result.rows;
    return res.json(objetivo)
  })
}

informeController.getVerActividad = (req, res) => {
  let id_informe = req.params.id_informe;

  pool.query('SELECT actividad.id, actividad.descripcion FROM actividad, objtetivo WHERE actividad.id_objetivo = objetivo.id AND objetivo.id_informe = $1', [id_informe], (err, result) => {
    if(err){return res.sendStatus(404)}
    let actividad = result.rows;
    return res.json(actividad);
  })
}

informeController.getVerAnalisis = (req, res) => {
  let id_informe = req.params.id_informe;

  pool.query('SELECT id, conclusion, recomendacion FROM analisis WHERE id_informe = $1', [id_informe], (err, result) => {
    if(err){return res.sendStatus(404)}
    let analisis = result.rows;
    return res.json(analisis);
  })
}

//----------------EDITAR---------------------

informeController.postEditarInforme = (req, res) => {
  let id_informe = req.params.id_informe;
  let fecha = new Date().toISOString().slice(0, 10);
  let completado = req.body.completado;

  pool.query('UPDATE informe SET fecha = $1, completado = $2 WHERE id = $3', [fecha, completado, id_informe], (err) => {
    if(err){return res.sendStatus(404)}
    return res.sendStatus(200);
  })
}

informeController.postEditarMetodologia = (req, res) => {
  let id_metodologia = req.body.id_metodologia;
  let descripcion = req.body.descripcion;

  pool.query('UPDATE metodologia SET descripcion = $1 WHERE id = $2', [descripcion, id_metodologia], (err) => {
    if(err){return res.sendStatus(404)}
    return res.sendStatus(200);
  })
}

informeController.postEditarSesion = (req, res) => {
  let id_sesion = req.body.id_sesion;
  let nombre = req.body.nombre;
  let descripcion = req.body.descripcion;

  pool.query('UPDATE sesion SET nombre = $1, descripcion = $2 WHERE id = $3', [nombre, descripcion, id_sesion], (err) => {
    if(err){return res.sendStatus(404)}
    return res.sendStatus(200);
  })
}

informeController.postEditarEvaluacion = (req, res) => {
  let id_evaluacion = req.body.id_evaluacion;
  let nombre = req.body.nombre;

  pool.query('UPDATE evaluacion SET nombre = $1 WHERE id_informe = $2', [nombre, id_evaluacion], (err) => {
    if(err){return res.sendStatus(404)}
    return res.sendStatus(200);
  })
}

informeController.postEditarCriterio = (req, res) => {
  let id_criterio = req.body.id_criterio;
  let nombre = req.body.nombre;
  let descripcion = req.body.descripcion;
  let puntaje = req.body.puntaje;

  pool.query('UPDATE criterio SET criterio.nombre = $1, criterio.descripcion = $2, criterio.puntaje = $3 WHERE criterio.id = $4', [nombre, descripcion, puntaje, id_criterio], (err) => {
    if(err){return res.sendStatus(404)}
    return res.sendStatus(200)
  })
}

informeController.postEditarObjetivo = (req, res) => {
  let id_objetivo = req.body.objetivo;
  let descripcion = req.body.descripcion;

  pool.query('UPDATE objetivo SET descripcion = $1 WHERE id_informe = $2', [descripcion, id_objetivo], (err) => {
    if(err){return res.sendStatus(404)}
    return res.sendStatus(200)
  })
}

informeController.postEditarActividad = (req, res) => {
  let id_actividad = req.body.id_actividad;
  let descripcion = req.body.descripcion;

  pool.query('UPDATE actividad SET descripcion = $1 WHERE id = $2', [descripcion, id_actividad], (err) => {
    if(err){return res.sendStatus(404)}
    return res.sendStatus(200);
  })
}

informeController.postEditarAnalisis = (req, res) => {
  let id_analisis = req.body.id_analisis;
  let conclusion = req.body.conclusion;
  let recomendacion = req.body.recomendacion;

  pool.query('UPDATE analisis SET conclusion = $1, recomendacion = $2 WHERE id = $3', [conclusion, recomendacion, id_analisis], (err) => {
    if(err){return res.sendStatus(404)}
    return res.sendStatus(404);
  })
}

module.exports = informeController;