import { INTEGER, Model, NUMBER } from 'sequelize';
import db from '.';


class Transaction extends Model {
  id!: number;
  debitedAccountId: number;
  creditedAccountId: number;
  value: number;
  createdAt: Date;
}

Transaction.init({
  id: {
    type: INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  /* 
  debitedAccountId: {
      type: INTEGER,
      allowNull: false,
      field: 'debitedAccountId',
    },
    creditedAccountId: {
        type: INTEGER,
        allowNull: false,
        field: 'creditedAccountId',
    },
    */
  value: {
    type: NUMBER,
    allowNull: false,
    field: 'value',
  },
  createdAt: {
    type: NUMBER,
    allowNull: false,
    field: 'createdAt',
  },
}, {
  // ... Outras configs
  underscored: true,
  sequelize: db,
  modelName: 'transactions',
  timestamps: false,
});

// Transaction.hasOne(AccountModel, {foreignKey: 'id', as: 'debitedAccountId'});
// Transaction.hasOne(AccountModel, {foreignKey: 'id', as: 'creditedAccountId'});

export default Transaction;
