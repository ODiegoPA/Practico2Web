const db = require("../models");
const path = require('path');
const fs = require('fs');
const { isRequestValid } = require("../utils/request.utils");

exports.listPeliculas = async (req, res) => {
    try {
        const peliculas = await db.pelicula.findAll({
            include: [{
                model: db.reparto,
                as: 'director'
            }],
            order: [['calificacion', 'DESC']]
        });
        res.status(200).json(peliculas);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

exports.getPeliculaById = async (req, res) => {
    const id = req.params.id;
    try {
        const pelicula = await db.pelicula.findByPk(id, {
            include: [{
                model: db.reparto,
                as: 'director'
            }]
        });
        if (pelicula) {
            res.status(200).json(pelicula);
        } else {
            res.status(404).json({ msg: 'Pelicula no encontrada' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
exports.getPeliculasByDirector = async (req, res) => {
    const id = req.params.id;
    try {
        const peliculas = await db.pelicula.findAll({
            where: { directorId: id },
            include: [{
                model: db.reparto,
                as: 'director'
            }]
        });
        res.status(200).json(peliculas);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
exports.getPeliculasByActor = async (req, res) => {
    const actorId = req.params.id;
    try {
        const peliculas = await db.pelicula.findAll({
            include: [{
                model: db.actua,
                as: 'actuaciones',
                where: { repartoId: actorId },
                include: [{
                    model: db.reparto,
                    as: 'reparto'
                }]
            }]
        });
        res.status(200).json(peliculas);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
exports.getPeliculasByDirector = async (req, res) => {
    const directorId = req.params.id;
    try {
        const peliculas = await db.pelicula.findAll({
            where: { directorId: directorId }
        });
        res.status(200).json(peliculas);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
exports.createPelicula = async (req, res) => {
    const requiredFields = ['nombre', 'sinopsis', 'fechaLanzamiento', 'calificacion','trailerURL', 'directorId'];
    const image = req.files.photo;
    if (!isRequestValid(requiredFields, req.body, res)) {
        return;
    }
    const embedTrailerURL = youtubeEmbed(req.body.trailerURL);
    try{
        const pelicula = {
            nombre: req.body.nombre,
            sinopsis: req.body.sinopsis,
            fechaLanzamiento: req.body.fechaLanzamiento,
            calificacion: req.body.calificacion,
            trailerURL: embedTrailerURL,
            directorId: req.body.directorId
        }
        const peliculaCreada = await db.pelicula.create(pelicula);
        const path = __dirname + '/../public/images/peliculas/' + peliculaCreada.id + '.jpg';	
        image.mv(path, function (err){
            if (err) {
                console.log('error al subir')
                return res.status(500).json({ error: 'Error al subir la imagen' });
            }
        });
        res.status(201).json(peliculaCreada);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

exports.updatePeliculaPut = async (req, res) => {
    const id = req.params.id;
    const photo = req.files ? req.files.photo : null;
    try{
        const pelicula = await getPeliculaOr404(id, res);
        if (!pelicula) {
            return;
        }
        const requiredFields = ['nombre', 'sinopsis', 'fechaLanzamiento', 'calificacion','trailerURL', 'directorId'];
        if (!isRequestValid(requiredFields, req.body, res)) {
            return;
        }
        const embedTrailerURL = youtubeEmbed(req.body.trailerURL);
        pelicula.nombre = req.body.nombre;
        pelicula.sinopsis = req.body.sinopsis;
        pelicula.fechaLanzamiento = req.body.fechaLanzamiento;
        pelicula.calificacion = req.body.calificacion;
        pelicula.trailerURL = embedTrailerURL;
        pelicula.directorId = req.body.directorId;
        if (photo){
            const path = __dirname + '/../public/images/peliculas/' + pelicula.id + '.jpg';	
            photo.mv(path, function (err){
                if (err) {
                    return res.status(500).json({ error: 'Error al subir la imagen' });
                }
            });
        }
        await pelicula.save();
        res.json(pelicula);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }   
}

exports.deletePelicula = async (req, res) => {
    const id = req.params.id;
    try {
        const pelicula = await getPeliculaOr404(id, res);
        if (!pelicula) {
            return;
        }
        await pelicula.destroy();
        res.json({
            msg: 'Pelicula eliminada correctamente'
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
exports.getImagenPelicula = (req, res) => {
    const id = req.params.id;
    const imagePath = path.join(__dirname, '../public/images/peliculas/', `${id}.jpg`);

    fs.access(imagePath, fs.constants.F_OK, (err) => {
        if (err) {
            return res.status(404).json({ msg: 'Imagen no encontrada' });
        }
        res.sendFile(imagePath);
    });
};

async function getPeliculaOr404(id, res) {
    const pelicula = await db.pelicula.findByPk(id);
    if (!pelicula) {
        res.status(404).json({ msg: 'Pelicula no encontrada' });
    }
    return pelicula;
}
function youtubeEmbed(url) {
    const regex = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
    const match = url.match(regex);
    
    if (match && match[1]) {
        return `https://www.youtube.com/embed/${match[1]}`;
    }
    
    return null; // Retorna null si el enlace no es válido
}