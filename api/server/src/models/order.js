'use strict';
module.exports = (sequelize, DataTypes) => {
  const Order = sequelize.define('Order', {
    TableId: DataTypes.INTEGER,
    statusOrder: DataTypes.STRING
  }, {});
  Order.associate = function (models) {
    Order.hasMany(models.OrderItens);
    Order.belongsTo(models.Table);
  };
  return Order;
};

