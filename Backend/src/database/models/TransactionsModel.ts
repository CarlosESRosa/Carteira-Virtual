import { DATE, INTEGER, Model, NUMBER } from 'sequelize';
import db from '.';
import AccountModel from './AccountsModel'

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
    field: 'debited_account_id',
    references: {
      model: 'accounts',
      key: 'id',
    },
  },
  creditedAccountId: {
    type: INTEGER,
    allowNull: false,
    field: 'credited_account_id',
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
    type: DATE,
    allowNull: false,
    field: 'created_at',
  },
}, {
  // ... Outras configs
  underscored: true,
  sequelize: db,
  modelName: 'transactions',
  timestamps: false,
});

Transaction.belongsTo(AccountModel, { foreignKey: 'debitedAccountId', as: 'debitedAccount' });
Transaction.belongsTo(AccountModel, { foreignKey: 'creditedAccountId', as: 'creditedAccount' });

AccountModel.hasMany(Transaction, { foreignKey: 'debitedAccountId', as: 'debitedTransactions' });
AccountModel.hasMany(Transaction, { foreignKey: 'creditedAccountId', as: 'creditedransactions' });

export default Transaction;
