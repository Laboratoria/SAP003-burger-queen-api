'use strict';
module.exports = (sequelize, DataTypes) => {
  const Table = sequelize.define('Table', {
    tableNumber: DataTypes.INTEGER
  }, {});
  Table.associate = function (models) {
    Table.hasMany(models.Order)
  };
  return Table;
};