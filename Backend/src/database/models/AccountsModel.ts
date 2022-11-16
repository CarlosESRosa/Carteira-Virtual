import { INTEGER, Model, FLOAT } from 'sequelize';
import db from '.';
import UserModel from './UsersModel'

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
    type: FLOAT,
    allowNull: false,
  }
}, {
  // ... Outras configs
  underscored: true,
  sequelize: db,
  modelName: 'accounts',
  timestamps: false,
});

Account.hasOne(UserModel, {foreignKey: 'accountId', as: 'users'});
UserModel.belongsTo(Account, {foreignKey: 'accountId', as: 'accounts'});

export default Account;