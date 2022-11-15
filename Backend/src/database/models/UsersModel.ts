import { STRING, INTEGER, Model } from 'sequelize';
import db from '.';
import AccountModel from './AccountsModel'

class User extends Model {
  id!: number;
  username: string;
  password: string;
  accountId: number;
}

User.init({
  id: {
    type: INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  username: {
    type: STRING,
    allowNull: false,
    field: 'username',
  },
  password: {
    type: STRING,
    allowNull: false,
    field: 'password',
  },
  /* 
  accountId: {
    type: INTEGER,
    allowNull: false,
    field: 'accountId',
  },
  */
}, {
  // ... Outras configs
  underscored: true,
  sequelize: db,
  modelName: 'users',
  timestamps: false,
});

User.hasOne(AccountModel, {foreignKey: 'id', as: 'accountId'})

export default User;
