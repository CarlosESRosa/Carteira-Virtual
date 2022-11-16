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
          field: 'debited_account_id',
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
          field: 'credited_account_id',
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
          type: Sequelize.DATE,
          field: 'created_at',
        },
      });
    },
    down: async (queryInterface) => {
      await queryInterface.dropTable('transactions');
    },
  };