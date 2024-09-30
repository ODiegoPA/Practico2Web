module.exports = (sequelize, Sequelize) =>{
    const Actua = sequelize.define("actua", {
        personaje: {
            type: Sequelize.STRING
        },
    });
    return Actua;
}