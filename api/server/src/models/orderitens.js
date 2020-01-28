'use strict';
module.exports = (sequelize, DataTypes) => {
  const OrderItens = sequelize.define('OrderItens', {
    productId: DataTypes.INTEGER,
    orderId: DataTypes.INTEGER,
    statusItem: DataTypes.STRING
  }, {});
  OrderItens.associate = function (models) {
    // OrderItens.belongsTo(models.Order, { as: 'order_id' });
  };
  return OrderItens;
};