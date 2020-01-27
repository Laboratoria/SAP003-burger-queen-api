'use strict';
module.exports = (sequelize, DataTypes) => {
  const Table = sequelize.define('Table', {
    table_number: DataTypes.INTEGER
  }, {});
  Table.associate = function (models) {
    Table.hasMany(models.OrderItens)
  };
  return Table;
};