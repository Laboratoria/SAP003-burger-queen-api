'use strict';
module.exports = (sequelize, DataTypes) => {
  const OrderItens = sequelize.define('OrderItens', {
    ProductId: DataTypes.INTEGER,
    OrderId: DataTypes.INTEGER,
    statusItem: DataTypes.STRING
  }, {});
  OrderItens.associate = function (models) {
    // OrderItens.belongsTo(models.Order, { as: 'order_id' });
  };
  return OrderItens;
};