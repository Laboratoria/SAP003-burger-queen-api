'use strict';
module.exports = (sequelize, DataTypes) => {
  const Table = sequelize.define('Table', {
    client_name: DataTypes.STRING,
    table_number: DataTypes.INTEGER
  }, {});
  Table.associate = function(models) {
    Table.hasMany(models.Orders)
  };
  return Table;
};