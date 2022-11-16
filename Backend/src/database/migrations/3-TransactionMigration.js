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
          type: Sequelize.INTEGER,
          allowNull: false,
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE',
          references: {
            model: 'accounts',
            key: 'id',
          },
        },
        creditedAccountId: {
          type: Sequelize.INTEGER,
          allowNull: false,
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE',
          references: {
            model: 'accounts',
            key: 'id',
          },
        },
        value: {
          allowNull: false,
          type: Sequelize.FLOAT,
        },
        createdAt: {
          allowNull: false,
          type: Sequelize.FLOAT,
        },
      });
    },
    down: async (queryInterface) => {
      await queryInterface.dropTable('transactions');
    },
  };