'use strict';
module.exports = (sequelize, DataTypes) => {
  const Orders = sequelize.define('Orders', {
    itens: DataTypes.ARRAY(DataTypes.STRING),
    
  }, {});
  Orders.associate = function(models) {
    // associations can be defined here
  };
  return Orders;
};