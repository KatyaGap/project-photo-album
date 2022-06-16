'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Privates extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
    }
  }
  Privates.init({
    albumId: DataTypes.INTEGER,
    private_email: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Privates',
  });
  return Privates;
};
