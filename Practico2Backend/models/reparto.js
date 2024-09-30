module.exports = (sequelize, Sequelize) =>{
    const Reparto = sequelize.define("reparto", {
        nombre: {
            type: Sequelize.STRING,
        },
        fechaNacimiento: {
            type: Sequelize.DATE
        },
        nacionalidad: {
            type: Sequelize.STRING
        },
    });

    return Reparto;
}