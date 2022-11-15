module.exports = {
    up: async (queryInterface) => {
      await queryInterface.bulkInsert(
        'users',
        [
          {
            username: 'Carlos',
            password: 'Carlospass',
            accountId: 1,
          },
          {
            username: 'Rosa',
            password: 'Rosapass',
            accountId: 2,
          },
          {
            username: 'Boca09',
            password: 'Boca09pass',
            accountId: 3,
          }
        ],
        {},
      );
    },
  
    down: async (queryInterface) => {
      await queryInterface.bulkDelete('users', null, {});
    },
  };
  