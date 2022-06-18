'use strict';
const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Cards extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Albums, { foreignKey: 'album_id' });
    }
  }
  Cards.init({
    photo_title: DataTypes.STRING,
    image: DataTypes.STRING,
    description: DataTypes.STRING,
    album_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Cards',
  });
  return Cards;
};
