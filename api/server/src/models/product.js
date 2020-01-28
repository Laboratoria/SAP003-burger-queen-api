'use strict';
module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define('Product', {
    name: DataTypes.STRING,
    breakfast: DataTypes.BOOLEAN,
    price: DataTypes.INTEGER,
    product_type: DataTypes.STRING
  }, {});
  Product.associate = function(models) {
    //Product.hasMany(models.Order)
    // associations can be defined here
  };
  return Product;
};