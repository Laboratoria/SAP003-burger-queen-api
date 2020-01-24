'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createOrders('Orders', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      itens: {
        type: Sequelize.ARRAY(Sequelize.STRING)
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      tableId: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      menuId: {
        allowNull: false,
        type: Sequelize.INTEGER
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropOrders('Orders');
  }
};