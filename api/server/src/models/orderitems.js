'use strict';
module.exports = (sequelize, DataTypes) => {
  const OrderItems = sequelize.define('OrderItems', {
    productId: DataTypes.INTEGER,
    orderId: DataTypes.INTEGER,
    extrasId: DataTypes.INTEGER,
    qdt: DataTypes.INTEGER,
    options: DataTypes.STRING
  }, {});
  OrderItems.associate = function(models) {
    // associations can be defined here
  };
  return OrderItems;
};