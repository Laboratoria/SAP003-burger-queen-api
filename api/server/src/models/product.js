'use strict';
module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define('Product', {
    name: DataTypes.STRING,
    price: DataTypes.INTEGER,
    is_alcoholic: DataTypes.BOOLEAN
  }, {});
  Product.associate = function(models) {
    Product.hasMany(models.OrderItens)
  };
  return Product;
};