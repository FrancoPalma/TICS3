const pool = require('../config/database.js');
const path = require('path')
const fs = require('fs');
const multer = require('multer')


infanteController = {}

infanteController.postAgregarInfante = (req, res) => {

  let id_jardin = req.body.id_jardin;
  let rut_infante = req.body.rut_infante;
  let nombre = req.body.nombre_infante;
  let fecha_nacimiento = req.body.fecha_nacimiento;

  let rut_apoderado = req.body.rut_apoderado;
  let nombre_apoderado = req.body.nombre_apoderado;
  let email = req.body.email;
  let telefono = req.body.telefono;

  
  let REfecha = new RegExp('^[0-9][0-9][0-9][0-9]-[0-9][0-9]-[0-9][0-9]+$')
  let RErut = new RegExp('^([0-9][0-9]|[0-9])[0-9][0-9][0-9][0-9][0-9][0-9]-([0-9]|k|K)+$')
	let REletras = new RegExp('^[ A-Za-zäÄëËïÏöÖüÜáéíóúáéíóúÁÉÍÓÚÂÊÎÔÛâêîôûàèìòùÀÈÌÒÙ]+$');
	let REnumeros = new RegExp('^[0-9]+$')
	let REemail = new RegExp('[@]')
  
  /*console.log(RErut.test(rut_infante))
  console.log(RErut.test(rut_apoderado))
  console.log(REletras.test(nombre))
  console.log(REletras.test(nombre_apoderado))
  console.log(REfecha.test(fecha_nacimiento))
  console.log(REemail.test(email))
  console.log(REnumeros.test(telefono))*/

  if(RErut.test(rut_infante) && RErut.test(rut_apoderado) && REletras.test(nombre) && REletras.test(nombre_apoderado) && REfecha.test(fecha_nacimiento) && REemail.test(email) && REnumeros.test(telefono)){
    pool.query('BEGIN', (err) => {
      if(err){ return res.sendStatus(404)}
      pool.query('INSERT INTO infante(id_jardin, rut, nombre, fecha_nacimiento) VALUES ($1,$2,$3, $4)', [id_jardin, rut_infante, nombre, fecha_nacimiento], (err) => {
        if(err){ 
          return res.sendStatus(404)}
        pool.query('INSERT INTO apoderado(rut, rut_infante, nombre, email, telefono) VALUES ($1,$2,$3,$4,$5)', [rut_apoderado, rut_infante, nombre_apoderado, email, telefono], (err) => {
          if(err){
            return res.sendStatus(404)}
          pool.query('COMMIT', (err) => {
            if(err){
              return res.sendStatus(404)}
            return res.sendStatus(200);
          });
        });
      });
    })
  }else{
    return res.sendStatus(405)
  }
};

infanteController.postEditarInfante = (req, res) => {
  let rut_infante = req.params.rut_infante;
  let nombre = req.body.nombre;

  let rut_apoderado = req.body.rut_apoderado;
  let nombre_apoderado = req.body.nombre_apoderado;
  let email = req.body.email;
  let telefono = req.body.telefono;

	let RErut = new RegExp('^([0-9][0-9]|[0-9])[0-9][0-9][0-9][0-9][0-9][0-9]-([0-9]|k|K)+$')
	let REletras = new RegExp('^[ A-Za-zäÄëËïÏöÖüÜáéíóúáéíóúÁÉÍÓÚÂÊÎÔÛâêîôûàèìòùÀÈÌÒÙ]+$');
	let REnumeros = new RegExp('^[0-9]+$')
	let REemail = new RegExp('[@]')

  console.log(RErut.test(rut_infante))
  console.log(RErut.test(rut_apoderado))
  console.log(REletras.test(nombre))
  console.log(REletras.test(nombre_apoderado))
  console.log(REemail.test(email))
  console.log(REnumeros.test(telefono))

  if(RErut.test(rut_apoderado) && REletras.test(nombre) && REletras.test(nombre_apoderado) && REemail.test(email) && REnumeros.test(telefono)){
    pool.query('BEGIN', (err) => {
      if(err){ return res.sendStatus(200)}
      pool.query('UPDATE infante SET nombre = $1 WHERE rut = $2', [nombre, rut_infante], (err) => {
        if(err){res.sendStatus(404)}
          pool.query('UPDATE apoderado SET rut = $1, nombre = $2, email = $3, telefono = $4 WHERE rut_infante = $5', [rut_apoderado, nombre_apoderado, email, telefono, rut_infante], (err) => {
            if(err){res.sendStatus(404)}
            pool.query('COMMIT', (err) => {
              if(err){res.sendStatus(404)}
              return res.sendStatus(200);
            });
          });
        });
    }); 
  }else{
    return res.sendStatus(405)
  }
};

infanteController.getVerInfantes = (req, res) => {
  pool.query('SELECT infante.rut, infante.nombre, infante.fecha_nacimiento, apoderado.nombre as nombre_apoderado, apoderado.telefono FROM infante, apoderado WHERE apoderado.rut_infante = infante.rut', (err, result)=> {
    if(err){ return res.sendStatus(404)}

    return res.json(result.rows)
  })
}
  
infanteController.postVerInfante = (req, res) => {
  let rut_infante = req.params.rut_infante;

  pool.query('SELECT infante.rut, infante.nombre, infante.fecha_nacimiento, apoderado.rut as rut_apoderado, apoderado.nombre as nombre_apoderado, apoderado.email, apoderado.telefono FROM infante, apoderado WHERE apoderado.rut_infante = infante.rut AND infante.rut = $1', [rut_infante], (err, result)=> {
    if(err){ return res.sendStatus(404)}

    return res.json(result.rows[0]);
  })
}

infanteController.postEliminarInfante = (req, res) => {
	let rut_infante = req.params.rut_infante;

  pool.query('BEGIN', (err) => {
    if(err){return res.sendStatus(404)}
  pool.query('SELECT informe.id FROM informe, infante WHERE informe.rut_infante = infante.rut AND infante.rut = $1', [rut_infante], (err, result) => {
    let informes = result.rows
    if(err){
      console.log("hola1")
      pool.query('ROLLBACK')
      return res.sendStatus(404)
    }
    pool.query('DELETE FROM apoderado WHERE rut_infante = $1', [rut_infante], (err) => {
      if(err){
        console.log("hola2")
        pool.query('ROLLBACK')
        return res.sendStatus(404)
      }
      pool.query('DELETE FROM informe WHERE rut_infante = $1', [rut_infante], (err) => {
        if(err){
          console.log("hola2")
          pool.query('ROLLBACK')
          return res.sendStatus(404)
        }
        pool.query('DELETE FROM infante WHERE infante.rut = $1', [rut_infante], (err) => {
          if(err){
            pool.query('ROLLBACK')
            return res.sendStatus(404)
          }
          fs.unlink(path.join(__dirname, '../public/fichas/ficha'+rut_infante+'.pdf'), (err) => {
            if(informes.length > 0){
              for(let i = 0; i < informes.length; i++){
                fs.unlink(path.join(__dirname, '../public/informes/informe'+informes[i].id+'.pdf'), (err) => {
                  if (err) {console.log(err)}
                  fs.unlink(path.join(__dirname, '../public/informes/informe'+informes[i].id+'.html'), (err) => {
                    if (err) {console.log(err)}
                  })
                })
              }
              pool.query('COMMIT')
              return res.sendStatus(200)
            }else{
              pool.query('COMMIT')
              return res.sendStatus(200)
            };
          })
            
        })
      })
    })
  });
})
}

infanteController.postVerFicha = (req, res) => {
  let rut_infante = req.params.rut_infante;

  archivo = path.join(__dirname, '../public/fichas','ficha'+rut_infante+'.pdf');
  
  fs.readFile(archivo , function (err,data){
    if(err){return res.sendStatus(404);}
    res.contentType("application/pdf");
    res.send(data);
  });
}

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
  cb(null, path.join(__dirname, '../public/fichas'))
},
filename: (req, file, cb) => {
  console.log(file)
  let rut_infante = req.params.rut_infante
  cb(null, 'ficha'+rut_infante+'.pdf')
}
})


infanteController.postImportarFicha = async (req, res) => {
  var upload = multer({ storage: storage,
    fileFilter: function (req, file, cb) {
      let extension = path.extname(file.originalname) 
      if (extension !== '.pdf') {
        return cb(new Error('Extension de archivo incorrecta'))
      }
      cb(null, true)
    }
  }).single('file')
  upload(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      console.log(err)
        return res.sendStatus(404)
    } else if (err) {
      console.log(err)
        return res.sendStatus(404)
    }
  return res.sendStatus(200);
  })
}

infanteController.postVerInformes = (req, res) => {
  let rut_infante = req.params.rut_infante;
  
  pool.query('SELECT informe.id, informe.rut_usuario, informe.fecha FROM informe, infante WHERE informe.rut_infante = $1', [rut_infante], (err, result) => {
    if(err){return res.sendStatus(404)}
    return res.json(result.rows)
  })
}

module.exports = infanteController;