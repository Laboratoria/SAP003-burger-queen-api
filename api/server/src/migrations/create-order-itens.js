'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('OrderItens', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      ProductId: {
        type: Sequelize.INTEGER,
        references: { model: 'Products', key: 'id' }
      },
      OrderId: {
        type: Sequelize.INTEGER,
        references: { model: 'Orders', key: 'id' }
      },
      statusItem: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('OrderItens');
  }
};
