import { INTEGER, Model, NUMBER } from 'sequelize';
import db from '.';

class Transaction extends Model {
  id!: number;
  debitedAccountId: number;
  creditedAccountId: number;
  value: number;
  createdAt: number;
}

Transaction.init({
  id: {
    type: INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  debitedAccountId: {
    type: INTEGER,
    allowNull: false,
    references: {
      model: 'accounts',
      key: 'id',
    },
  },
  creditedAccountId: {
    type: INTEGER,
    allowNull: false,
    references: {
      model: 'accounts',
      key: 'id',
    },
  },
  value: {
    type: NUMBER,
    allowNull: false,
  },
  createdAt: {
    type: NUMBER,
    allowNull: false,
  },
}, {
  // ... Outras configs
  underscored: true,
  sequelize: db,
  modelName: 'transactions',
  timestamps: false,
});


export default Transaction;
