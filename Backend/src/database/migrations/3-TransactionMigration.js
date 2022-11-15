module.exports = {
    up: async (queryInterface, Sequelize) => {
      await queryInterface.createTable('transactions', {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER,
        },
        debitedAccountId: {
            field: 'debitedAccountId',
            foreignKey: true,
            allowNull: false,
            type: Sequelize.INTEGER,
        },
        creditedAccountId: {
            field: 'creditedAccountId',
            foreignKey: true,
            allowNull: false,
            type: Sequelize.INTEGER,
        },
        value: {
            field: 'value',
            allowNull: false,
            type: Sequelize.FLOAT,
        },
        createdAt: {
            field: 'createdAt',
            allowNull: false,
            type: Sequelize.FLOAT,
        },
        
      });
    },
    down: async (queryInterface) => {
      await queryInterface.dropTable('transactions');
    },
  };