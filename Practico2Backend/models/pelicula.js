
module.exports = (sequelize, Sequelize) =>{
    const Pelicula = sequelize.define("pelicula", {
        nombre: {
            type: Sequelize.STRING,
        },
        sinopsis: {
            type: Sequelize.STRING
        },
        fechaLanzamiento: {
            type: Sequelize.DATE
        },
        calificacion: {
            type: Sequelize.INTEGER
        },
        trailerURL: {
            type: Sequelize.STRING
        },
        directorId: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
    });

    return Pelicula;
}