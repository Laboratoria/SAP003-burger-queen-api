'use strict';
module.exports = (sequelize, DataTypes) => {
  const Order = sequelize.define('Order', {
    client_name: DataTypes.STRING,
    table_number: DataTypes.INTEGER,
    status: DataTypes.BOOLEAN,
    product_id: DataTypes.INTEGER
  }, {});
  Order.associate = function(models) {
    //Order.hasMany(models.Product)
    // associations can be defined here
  };
  return Order;
};