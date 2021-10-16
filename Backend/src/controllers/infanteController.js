const pool = require('../config/database.js');
infanteController = {}

infanteController.postAgregarInfante = (req, res) => {
  let id_jardin = req.user.id_jardin;
  let rut_infante = req.body.rut;
  let nombre = req.body.nombre;
  let fecha_nacimiento = req.body.fecha_nacimiento;

  let rut_apoderado = req.body.rut_apoderado;
  let nombre_apoderado = req.body.nombre_apoderado;
  let email = req.body.email;
  let telefono = req.body.telefono;

  if(req.user.gestion_infante){
    pool.query('BEGIN', (err) => {
      if(err){ return res.sendStatus(200)}
      pool.query('INSERT INTO infante(id_jardin, rut, nombre, fecha_nacimiento) VALUES ($1,$2,$3, $4)', [id_jardin, rut_infante, nombre, fecha_nacimiento], (err) => {
        if(err){res.sendStatus(404)}
        pool.query('INSERT INTO apoderado(rut, rut_infante, nombre, email, telefono) VALUES ($1,$2,$3,$4,$5)', [rut_apoderado, rut_infante, nombre_apoderado, email, telefono], (err) => {
          if(err){res.sendStatus(404)}
          pool.query('COMMIT', (err) => {
            if(err){res.sendStatus(404)}
            return res.sendStatus(200);
          });
        });
      });
    })
  }else{
    return res.sendStatus(404)
  }
};

infanteController.postEditarInfante = (req, res) => {
  let rut_infante = req.params.rut;
  let nombre = req.body.nombre;

  let rut_apoderado = req.body.rut_apoderado;
  let nombre_apoderado = req.body.nombre_apoderado;
  let email = req.body.email;
  let telefono = req.body.telefono;


  if(req.user.gestion_infate){
    pool.query('BEGIN', (err) => {
      if(err){ return res.sendStatus(200)}
      pool.query('UPDATE infante SET nombre = $1 WHERE rut = $2', [nombre, rut_apoderado], (err) => {
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
    return res.sendStatus(404);
  }
};

infanteController.getVerInfantes = (req, res) => {
  pool.query('SELECT infante.rut, infante.nombre FROM infante', (err, result)=> {
    if(err){ return res.sendStatus(404)}
    return res.json(result.rows)
  })
}

infanteController.getVerInfante = (req, res) => {
  let rut_infante = req.params.rut_infante;

  pool.query('SELECT infante.rut, infante.nombre FROM infante, apoderado WHERE apoderado.rut_infante = infante.rut AND infante.rut = $1', [rut_infante], (err, result)=> {
    if(err){ return res.sendStatus(404)}
    return res.json(result.rows[0]);
  })
}

infanteController.postEliminarInfante = (req, res) => {
	let rut_infante = req.params.rut_infante;

  if(req.user.gestion_infante){
	pool.query('DELETE FROM infante WHERE infante.rut = $1', [rut_infante], (err) => {
		if(err){return res.sendStatus(404)}
		return res.sendStatus(200);
	});
  }else{
    return res.sendStatus(404)
  }
};

infanteController.getVerFicha = (req, res) => {
  return res.render('fichas')
};

infanteController.postImportarFicha = async (req, res) => {
  let ficha = req.body.ficha;
  let rut_infante = '12345678-9';

  pool.query('UPDATE infante SET ficha_clinica =  $1 WHERE infante.rut = $2', [ficha, rut_infante], (err) => {
    if(err){return res.sendStatus(404)}
    return res.sendStatus(200);
  })
};

module.exports = infanteController;