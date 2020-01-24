'use strict';
module.exports = (sequelize, DataTypes) => {
  const Menu = sequelize.define('Menu', {
    name: DataTypes.STRING,
    value: DataTypes.INTEGER,
    category: DataTypes.STRING,
    drink: DataTypes.BOOLEAN
  }, {});
  Menu.associate = function(models) {
    Menu.hasMany(models.Orders)
  };
  return Menu;
};