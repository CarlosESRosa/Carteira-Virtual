module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      username: {
        field: 'username',
        allowNull: false,
        type: Sequelize.STRING,
      },
      password: {
        field: 'password',
        allowNull: false,
        type: Sequelize.STRING,
      },
      accountId: {
        field: 'accountId',
        foreignKey: true,
        allowNull: false,
        type: Sequelize.INTEGER,
      }
    });
  },
  down: async (queryInterface) => {
    await queryInterface.dropTable('users');
  },
};