module.exports = {
    up: async (queryInterface) => {
      await queryInterface.bulkInsert(
        'transactions',
        [
          {
            debitedAccountId: 1,
            creditedAccountId: 2,
            value: 500000,
            createdAt: 10
          },
          {
            debitedAccountId: 3,
            creditedAccountId: 2,
            value: 1500000,
            createdAt: 10
          }
        ],
        {},
      );
    },
  
    down: async (queryInterface) => {
      await queryInterface.bulkDelete('transactions', null, {});
    },
  };
  