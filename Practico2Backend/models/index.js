const dbConfig = require("../config/db.config.js");
const Sequelize = require("sequelize");

const sequelize = new Sequelize(
    dbConfig.DB,
    dbConfig.USER,
    dbConfig.PASSWORD,
    {
        host: dbConfig.HOST,
        port: dbConfig.PORT,
        dialect: "mysql",
    }
);

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.pelicula = require("./pelicula.js")(sequelize, Sequelize);
db.reparto = require("./reparto.js")(sequelize, Sequelize);
db.actua = require("./actua.js")(sequelize, Sequelize);

// Relación 1:N entre Reparto (director) y Pelicula
// Esta es la única relación directa entre pelicula y reparto (para el director)
db.reparto.hasMany(db.pelicula, { as: "dirigidasPeliculas", foreignKey: "directorId" });
db.pelicula.belongsTo(db.reparto, {
    foreignKey: "directorId",
    as: "director", // Un película tiene un director en reparto
});

// Relación N:N entre Reparto y Pelicula para los actores (a través de la tabla intermedia Actua)
// No se creará ningún "repartoId" en la tabla pelicula, sino que será manejado por la tabla intermedia "actua"
db.reparto.belongsToMany(db.pelicula, {
    through: db.actua,
    as: "actuadasPeliculas", // Relación para actores
    foreignKey: "repartoId",
});
db.pelicula.belongsToMany(db.reparto, {
    through: db.actua,
    as: "actores", // Alias para los actores
    foreignKey: "peliculaId",
});

// Relaciones entre Actua, Reparto y Pelicula
db.actua.belongsTo(db.reparto, {
    foreignKey: "repartoId",
    as: "reparto",
});
db.reparto.hasMany(db.actua, { 
    foreignKey: "repartoId",
    as: "actuaciones"
});

db.actua.belongsTo(db.pelicula, {
    foreignKey: "peliculaId",
    as: "pelicula",
});
db.pelicula.hasMany(db.actua, { 
    foreignKey: "peliculaId",
    as: "actuaciones"
});

module.exports = db;
