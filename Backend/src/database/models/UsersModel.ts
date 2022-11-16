import { STRING, INTEGER, Model } from 'sequelize';
import db from '.';

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
  accountId: {
    type: INTEGER,
    field: 'account_id',
    allowNull: false,
    references: {
      model: 'accounts',
      key: 'id',
    },
  }
}, {
  // ... Outras configs
  underscored: true,
  sequelize: db,
  modelName: 'users',
  timestamps: false,
});


export default User;
