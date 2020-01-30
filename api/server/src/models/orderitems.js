'use strict';
module.exports = (sequelize, DataTypes) => {
  const OrderItems = sequelize.define('OrderItems', {
    ProductId: DataTypes.INTEGER,
    OrderId: DataTypes.INTEGER,
    ExtrasId: DataTypes.INTEGER,
    qdt: DataTypes.INTEGER,
    options: DataTypes.STRING
  }, {});
  OrderItems.associate = function(models) {
    // associations can be defined here
  };
  return OrderItems;
};