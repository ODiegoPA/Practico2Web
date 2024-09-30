module.exports = app => {
    let router = require("express").Router();
    const controller = require("../controllers/reparto.controllers");

    router.get("/", controller.listRepartosByName);
    router.get("/:id", controller.getRepartoById);
    router.post("/", controller.createReparto);
    router.patch("/:id", controller.updateRepartoPatch);
    router.put("/:id", controller.updateRepartoPut);
    router.delete("/:id", controller.deleteReparto);
    router.get("/:id/foto", controller.getImagenReparto);
    router.get("/pelicula/:id", controller.getRepartosbyPelicula);
    app.use('/reparto', router);
}