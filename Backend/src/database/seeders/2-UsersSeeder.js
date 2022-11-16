module.exports = {
    up: async (queryInterface) => {
      await queryInterface.bulkInsert('users',
        [
          {
            username: 'Carlos',
            password: '$2a$10$T.qzOliIcxZzHblBEKe7UOA/7dtMP7ProbJb7kLeUS1wArjl4d.v6', // Carlospass1
            account_id: 1,
          },
          {
            username: 'Rosa',
            password: '$2a$10$YNYTLsc0JZ.b5JFEiisXJeawVbIb0NCjfZRTqMkRu3byoit.OB29S', // Rosapass1
            account_id: 2,
          },
          {
            username: 'Boca09',
            password: '$2a$10$CXmFG8SiHUZJ3EsmRo6Zje1VKmYW5rrLNnS7K3VxnVmWKTgmpxiD6', // Boca09pass1
            account_id: 3,
          }
        ],
        {},
      );
    },
  
    down: async (queryInterface) => {
      await queryInterface.bulkDelete('users', null, {});
    },
  };
  