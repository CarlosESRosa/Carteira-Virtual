import * as bcrypt from 'bcryptjs';

import ThrowError from '../utils/throwError';
import userModel from '../database/models/UsersModel';
import accountModel from '../database/models/AccountsModel';
import { IService, User, UserPayload, Account } from '../protocols';


export default class Service implements IService {
    invalidFields = new ThrowError(400, 'All fields must be filled');
    badRequest = new ThrowError(400, 'Username need to have at least 3 caracteres and password 8 caracteres, a number and a capital letter');
    notPossibleToCreate = new ThrowError(401, 'User already exists');

    GetUserByUsername = async (username: string): Promise<User | null> => {
        const user = await userModel.findOne(
            { where: { username: username } },
        );
        
        return user as User | null;
    };

    createAccount = async (balance: number): Promise<Account> => {
        const createdAccount = await accountModel.create(
            { balance },
        );

        return createdAccount as unknown as Account;
    };

    createUser = async (data: UserPayload): Promise<User> => {
        const { username, password } = data;
       
        if(!username) throw this.invalidFields;
        if(!password) throw this.invalidFields;
        
        const userExist = await this.GetUserByUsername(username);
        
        // Payload validations
        if(userExist) throw this.notPossibleToCreate;
        if(username.length < 3) throw this.badRequest;
        const haveUppercase = password.match(/^[^]([^.]*)/);
        const haveNumber = /[0-9]/.test(password);
        if(password.length < 8 || !haveUppercase || !haveNumber) throw this.badRequest;

        const newAccount = await this.createAccount(100);
        
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(password, salt);
        
        const createdUser = await userModel.create(
            { username, password: hash, accountId: newAccount.id },
        );
        
        return createdUser as User;
    };
}