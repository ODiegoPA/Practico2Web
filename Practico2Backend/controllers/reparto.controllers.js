const db = require("../models");
const path = require('path');
const fs = require('fs');
const { isRequestValid } = require("../utils/request.utils");

exports.listRepartosByName = async (req, res) => {
    try {
        const repartos = await db.reparto.findAll({
            order: [['nombre', 'ASC']]
        });
        res.status(200).json(repartos);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
exports.getRepartoById = async (req, res) => {
    const id = req.params.id;
    try {
        const reparto = await db.reparto.findByPk(id);
        if (reparto) {
            res.status(200).json(reparto);
        } else {
            res.status(404).json({ msg: 'Reparto no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
exports.getRepartosbyPelicula = async (req, res) => {
    const peliculaId = req.params.id;
    try {
        const repartos = await db.reparto.findAll({
            include: [{
                model: db.actua,
                as: 'actuaciones',
                where: { peliculaId: peliculaId }
            }]
        });
        res.status(200).json(repartos);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
exports.createReparto = async (req, res) => {
    const requiredFields = ['nombre', 'fechaNacimiento', 'nacionalidad'];
    const image = req.files.photo;
    if (!isRequestValid(requiredFields, req.body, res)) {
        return;
    }
    try{
        const reparto = {
            nombre: req.body.nombre,
            fechaNacimiento: req.body.fechaNacimiento,
            nacionalidad: req.body.nacionalidad
        }
        const repartoCreado = await db.reparto.create(reparto);
        const path = __dirname + '/../public/images/repartos/' + repartoCreado.id + '.jpg';
        image.mv(path, function (err){
            if (err) {
                return res.status(500).json({ error: 'Error al subir la imagen' });
            }
        });
        res.status(201).json(repartoCreado);
    } catch (error) {
        console.log('error al crear')
        res.status(500).json({ error: error.message });
    }
}
exports.updateRepartoPatch = async (req, res) => {
    const id = req.params.id;
    try{
        const reparto = await getRepartoOr404(id, res);
        if (!reparto) {
            return;
        }
        reparto.nombre = req.body.nombre || reparto.nombre;
        reparto.fechaNacimiento = req.body.fechaNacimiento || reparto.fechaNacimiento;
        reparto.nacionalidad = req.body.nacionalidad || reparto.nacionalidad;

        await db.reparto.update(reparto, {
            where: { id: id }
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

exports.updateRepartoPut = async (req, res) => {
    const id = req.params.id;
    const photo = req.files ? req.files.photo : null;
    try{
        const reparto = await getRepartoOr404(id, res);
        if (!reparto) {
            return;
        }
        const requiredFields = ['nombre', 'fechaNacimiento', 'nacionalidad'];
        if (!isRequestValid(requiredFields, req.body, res)) {
            return;
        }
        reparto.nombre = req.body.nombre;
        reparto.fechaNacimiento = req.body.fechaNacimiento;
        reparto.nacionalidad = req.body.nacionalidad;
        if (photo){
            const path = __dirname + '/../public/images/repartos/' + reparto.id + '.jpg';	
            photo.mv(path, function (err){
                if (err) {
                    return res.status(500).json({ error: 'Error al subir la imagen' });
                }
            });
        }
        await reparto.save();
        res.json(reparto);

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

exports.deleteReparto = async (req, res) => {
    const id = req.params.id;
    try {
        const reparto = await getRepartoOr404(id, res);
        if (!reparto) {
            return;
        }
        await reparto.destroy();
        res.json({
            msg: 'Reparto eliminado correctamente'
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

exports.getImagenReparto = (req, res) => {
    const id = req.params.id;
    const imagePath = path.join(__dirname, '../public/images/repartos/', `${id}.jpg`);

    fs.access(imagePath, fs.constants.F_OK, (err) => {
        if (err) {
            res.status(404).json({ error: 'Imagen no encontrada' });
        }
        res.sendFile(imagePath);
    });
} 
async function getRepartoOr404(id, res) {
    try {
        const reparto = await db.reparto.findByPk(id);
        if (!reparto) {
            res.status(404).json({ msg: 'Reparto no encontrado' });
            return null;
        }
        return reparto;
    } catch (error) {
        res.status(500).json({ error: error.message });
        return null;
    }
}