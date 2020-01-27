'use strict';
module.exports = (sequelize, DataTypes) => {
  const Order = sequelize.define('Order', {
    table_id: DataTypes.INTEGER,
    status_order: DataTypes.STRING
  }, {});
  Order.associate = function (models) {
    Order.hasMany(models.OrderItens)
  };
  return Order;
};