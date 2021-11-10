const pool = require('../config/database.js');
horarioController = {}

horarioController.postAnadirHorario = async (req, res) => {
    let responsable = req.body.responsable;
    let descripcion = req.body.descripcion;
    let fecha = req.body.fecha;
    let semana = req.body.semana;
    let inicio = req.body.inicio;
    let sala = req.body.sala;

    hora = inicio.split(":");
    hora = parseInt(hora[0]) * 3600 + parseInt(hora[1] * 60) + parseInt(hora[2]);
    duracion_modulo = duracion * 60;

    await pool.query('SELECT duracion_modulo FROM jardin WHERE jardin.id = $1', [1], (err, result) => {
        if(err){return res.sendStatus(404)}
        duracion = result.rows[0].duracion * 60;
        let fin = new Date((hora + duracion) * 1000).toISOString().substr(11, 8);
        pool.query('INSERT INTO horario(id_jardin, responsable, descripcion, fecha, semana, inicio, fin, sala) VALUES ($1, $2, $3, $4, $5, $6, $7)', [req.user.id_jardin, responsable, descripcion, fecha, semana, inicio, fin, sala], (err) => {
            if(err){return res.sendStatus(404);}
            pool.query('SELECT horario.id, horario.responsable, horario.descripcion, horario.fecha, horario.semana, horario.inicio, horario.fin, horario.sala FROM horario, jardin WHERE horario.semana = $1 AND horario.id_jardin = jardin.id AND jardin.id = $2', [semana, req.user.id_jardin], (err, result) => {
                if(err){return res.sendStatus(404)}
                return res.json(result.rows)
            })
        })
    });
    return res.sendStatus(200)
};

horarioController.postVerHorario = async (req, res) => {
    let semana = req.body.semana;

    pool.query('SELECT horario.id, horario.responsable, horario.descripcion, horario.fecha, horario.semana, horario.inicio, horario.fin, horario.sala FROM horario, jardin WHERE horario.semana = $1 AND horario.id_jardin = jardin.id AND jardin.id = $2', [semana, req.user.id_jardin], (err, result) => {
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