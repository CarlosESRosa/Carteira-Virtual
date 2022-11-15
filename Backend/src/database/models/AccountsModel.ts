import { INTEGER, Model, NUMBER } from 'sequelize';
import db from '.';
import UserModel from './UsersModel'
import TransactionModel from './TransactionsModel'

class Account extends Model {
  id!: number;
  balance: string;
}

Account.init({
  id: {
    type: INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  balance: {
    type: NUMBER,
    allowNull: false,
    field: 'balance',
  }
}, {
  // ... Outras configs
  underscored: true,
  sequelize: db,
  modelName: 'accounts',
  timestamps: false,
});

Account.belongsTo(UserModel, {foreignKey: 'accountId'})
Account.belongsTo(TransactionModel, {foreignKey: 'debitedAccountId'})
Account.belongsTo(TransactionModel, {foreignKey: 'creditedAccountId'})

export default Account;
