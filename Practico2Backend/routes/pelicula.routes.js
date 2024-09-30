module.exports = app => {
    let router = require("express").Router();
    const controller = require("../controllers/pelicula.controller");

    router.get("/", controller.listPeliculas);
    router.get("/:id", controller.getPeliculaById);
    router.post("/", controller.createPelicula);
    router.put("/:id", controller.updatePeliculaPut);
    router.delete("/:id", controller.deletePelicula);
    router.get("/director/:id", controller.getPeliculasByDirector);
    router.get("/actor/:id", controller.getPeliculasByActor);
    router.get("/director/:id",controller.getPeliculasByDirector)
    router.get("/:id/foto", controller.getImagenPelicula);
    app.use('/pelicula', router);
}