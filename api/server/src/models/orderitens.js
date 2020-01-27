'use strict';
module.exports = (sequelize, DataTypes) => {
  const OrderItens = sequelize.define('OrderItens', {
    product_id: DataTypes.INTEGER,
    order_id: DataTypes.INTEGER,
    status_item: DataTypes.STRING
  }, {});
  OrderItens.associate = function (models) {
    OrderItens.belongsTo(models.Order, { as: 'order_id' })
  };
  return OrderItens;
};