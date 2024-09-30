module.exports = app => {
    let router = require("express").Router();
    const controller = require("../controllers/actua.controller");

    router.get("/", controller.listActuas);
    router.get("/pelicula/:id", controller.getActuacionesByPelicula);
    router.get("/:repartoId/:peliculaId", controller.getActuacionByIds);
    router.post("/", controller.createActuacion);
    router.put("/:repartoId/:peliculaId/", controller.updateActuacionPut);
    router.delete("/:repartoId/:peliculaId/", controller.deleteActuacion);
    app.use('/actua', router);
}