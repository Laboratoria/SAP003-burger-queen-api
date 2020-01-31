'use strict';
module.exports = (sequelize, DataTypes) => {
  const Tables = sequelize.define('Tables', {
    table_number: DataTypes.INTEGER,
    OrderId: DataTypes.INTEGER
  }, {});
  Tables.associate = function(models) {
    // associations can be defined here
  };
  return Tables;
};