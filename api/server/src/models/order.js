'use strict';
module.exports = (sequelize, DataTypes) => {
  const Order = sequelize.define('Order', {
    tableId: DataTypes.INTEGER,
    statusOrder: DataTypes.STRING
  }, {});
  Order.associate = function (models) {
    Order.hasMany(models.OrderItens);
    Order.hasOne(models.Table);
  };
  return Order;
};

