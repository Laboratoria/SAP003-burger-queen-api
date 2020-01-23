'use strict';
module.exports = (sequelize, DataTypes) => {
  const Menu = sequelize.define('Menu', {
    name: DataTypes.STRING,
    value: DataTypes.NUMBER,
    category: DataTypes.STRING,
    drink: DataTypes.BOOLEAN
  }, {});
  Menu.associate = function(models) {
    // associations can be defined here
  };
  return Menu;
};