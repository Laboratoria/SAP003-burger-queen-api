'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('OrderItems', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      ProductId: {
        type: Sequelize.INTEGER,
        references: {model:'Products', key:'id'}
      },
      OrderId: {
        type: Sequelize.INTEGER,
        references: {model:'Orders', key:'id'}
      },
      ExtrasId: {
        type: Sequelize.INTEGER,
        references: {model:'Products', key:'id'}
      },
      qdt: {
        type: Sequelize.INTEGER
      },
      options: {
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
    return queryInterface.dropTable('OrderItems');
  }
};