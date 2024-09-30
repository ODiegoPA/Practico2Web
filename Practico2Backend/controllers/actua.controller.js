const db = require('../models');
const { isRequestValid } = require('../utils/request.utils');

exports.listActuas = async (req, res) => {
    try{
        const actuas = await db.actua.findAll({
            include: [{
                model: db.pelicula,
                as: 'pelicula'
            },{
                model: db.reparto,
                as: 'reparto'
            }]
        });
        res.status(200).json(actuas);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
exports.getActuacionesByPelicula = async (req, res) => {
    const id = req.params.id;
    try {
        const actuas = await db.actua.findAll({
            where: { peliculaId: id },
            include: [{
                model: db.reparto,
                as: 'reparto'
            }]
        });
        res.status(200).json(actuas);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
exports.getActuacionByIds = async (req, res) => {
    const { repartoId, peliculaId } = req.params; 

    try {

        const actua = await db.actua.findOne({
            where: {
                repartoId: repartoId,
                peliculaId: peliculaId
            },
            include: [{
                model: db.pelicula,
                as: 'pelicula'
            },{
                model: db.reparto,
                as: 'reparto'
            }]
        });

        if (!actua) {
            return res.status(404).json({ error: 'Actuación no encontrada' });
        }

        res.json(actua);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.createActuacion = async (req, res) => {
    const requiredFields = ['personaje','repartoId', 'peliculaId'];
    if (!isRequestValid(requiredFields, req.body, res)) {
        return;
    }
    try{
        const actua = {
            personaje: req.body.personaje,
            repartoId: req.body.repartoId,
            peliculaId: req.body.peliculaId
        }
        const actuaCreada = await db.actua.create(actua);
        res.status(201).json(actuaCreada);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
exports.updateActuacionPut = async (req, res) => {
    const { repartoId, peliculaId } = req.params;

    try {
        const actuacion = await db.actua.findOne({
            where: {
                repartoId: repartoId,
                peliculaId: peliculaId
            }
        });

        if (!actuacion) {
            return res.status(404).json({ error: 'Actuación no encontrada' });
        }

        const requiredFields = ['personaje', 'repartoId', 'peliculaId'];
        if (!isRequestValid(requiredFields, req.body, res)) {
            return;
        }

        actuacion.personaje = req.body.personaje;
        actuacion.repartoId = req.body.repartoId;
        actuacion.peliculaId = req.body.peliculaId;

        await actuacion.save();

        res.json(actuacion);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.deleteActuacion = async (req, res) => {
    const { repartoId, peliculaId } = req.params;

    try {

        const actua = await db.actua.findOne({
            where: {
                repartoId: repartoId,
                peliculaId: peliculaId
            }
        });

        if (!actua) {
            return res.status(404).json({ error: 'Actuación no encontrada' });
        }
        await actua.destroy();

        res.json({
            msg: 'Actuación eliminada correctamente'
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


