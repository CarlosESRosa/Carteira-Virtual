module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert('accounts',
      [
        {
          balance: 1000000,
        },
        {
          balance: 2000000,
        },
        {
          balance: 9000000,
        }
      ],
      {},
    );
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('accounts', null, {});
  },
};
