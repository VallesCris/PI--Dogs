const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('dog', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,

    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    height:{
      type: DataTypes.TEXT,
      allowNull: false,
    },
    weight: {
      type: DataTypes.TEXT,
      allowNull: false,

    },
    lifeSpan: {
      type: DataTypes.STRING,
      allowNull: false,

    },
    createdInDb:{
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,

    },

  },{timestamps: false});
};
