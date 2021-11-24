const pool = require('../config/database.js');
horarioController = {}

horarioController.postAnadirHorario = async (req, res) => {
    let rut_usuario = req.body.rut_usuario;
    let descripcion = req.body.descripcion;
    let fecha = req.body.fecha;
    let inicio = req.body.inicio;
    let fin = req.body.fin;
    let sala = req.body.sala;
    //let fin = new Date((hora + duracion) * 1000).toISOString().substr(11, 8);
    pool.query('INSERT INTO horario(id_jardin, rut_usuario, descripcion, fecha, inicio, fin, sala) VALUES ($1, $2, $3, $4, $5, $6, $7)', [req.user.id_jardin, rut_usuario, descripcion, fecha, inicio, fin, sala], (err) => {
        if(err){return res.sendStatus(404);}
        return res.sendStatus(200)
    })
};

horarioController.postVerHorario = async (req, res) => {
    let fecha = req.body.fecha;

    pool.query('SELECT horario.id, horario.rut_usuario, horario.descripcion, horario.inicio, horario.fin, horario.sala FROM horario, jardin WHERE horario.fecha = $1 AND horario.rut_usuario = $2', [fecha, req.user.rut], (err, result) => {
        if(err){return res.sendStatus(404)}
        return res.json(result.rows)
    })
}

horarioController.postVerHorarioAdmin = async (req, res) => {
    let fecha= req.body.fecha;

    pool.query('SELECT horario.id, horario.rut_usuario, horario.descripcion, horario.inicio, horario.fin, horario.sala FROM horario, jardin WHERE horario.fecha = $1 AND horario.id_jardin = $2', [fecha, req.user.id_jardin], (err, result) => {
        if(err){return res.sendStatus(404)}
        return res.json(result.rows)
    })
}

horarioController.postEliminarHorario = async (req, res) => {
    let id_horario = req.body.id_horario;
    pool.query('DELETE FROM horario WHERE id = $1', [id_horario], (err) => {
        if(err){return res.sendStatus(404)}
        return res.sendStatus(200)
    })
}

module.exports = horarioController;