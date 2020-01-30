'use strict';
module.exports = (sequelize, DataTypes) => {
  const Order = sequelize.define('Order', {
    client_name: DataTypes.STRING,
    table_number: DataTypes.INTEGER,
    status: DataTypes.STRING
  }, {});
  Order.associate = function(models) {
    Order.hasMany(models.OrderItems)
  };
  return Order;
};