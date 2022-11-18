import * as bcrypt from 'bcryptjs';
import mySortTransactions from '../utils/mySortTransactions';
import ThrowError from '../utils/throwError';
import userModel from '../database/models/UsersModel';
import transactionModel from '../database/models/TransactionsModel';
import accountModel from '../database/models/AccountsModel';
import { IService, User, UserPayload, Account, UserAndAccount, Transaction } from '../protocols';
import generateJWT from '../utils/generateJWT';
import { Op } from 'sequelize'


export default class Service implements IService {
	invalidFields = new ThrowError(400, 'All fields must be filled');
	badRequest = new ThrowError(400, 'Username need to have at least 3 caracteres and password 8 caracteres, a number and a uppercase character');
	notPossibleToCreate = new ThrowError(401, 'User already exists');
	incorectValues = new ThrowError(400, 'Incorrect Username or Password');
	notFound = new ThrowError(404, 'Username not found');
	invalidTransation = new ThrowError(400, 'Invalid transation, check if you have balance enought and if the username receivers is correct');
	
	createAccount = async (balance: number): Promise<Account> => {
		const createdAccount = await accountModel.create(
			{ balance },
		);

		return createdAccount as unknown as Account;
	};

	GetUserByUsername = async (username: string): Promise<UserAndAccount> => {
		const user = await userModel.findOne({
			where: {username: username},
			include: { model: accountModel, as: 'accounts' },
		})
		if(!user) throw this.notFound;
		
		return user as unknown as UserAndAccount;
	};

	createUser = async (data: UserPayload): Promise<User> => {
		const { username, password } = data;
		
		if(!username) throw this.invalidFields;
		if(!password) throw this.invalidFields;
		
		const userExist = await userModel.findOne({where: {username: username}});
		
		// Payload validations
		if(userExist) throw this.notPossibleToCreate;
		if(username.length < 3) throw this.badRequest;
		const haveUppercase = /(?=.*[A-Z])/.test(password);
		const haveNumber = /[0-9]/.test(password);
		
		if(password.length < 8 || haveUppercase === false || !haveNumber) throw this.badRequest;

		const newAccount = await this.createAccount(100);
		
		const salt = bcrypt.genSaltSync(10);
		const hash = bcrypt.hashSync(password, salt);
		
		const createdUser = await userModel.create(
			{ username, password: hash, accountId: newAccount.id },
		);
		
		return createdUser as User;
	};

	login = async (data: UserPayload): Promise<string> => {
		const { username, password } = data;
		
		const userFromDb = await userModel.findOne(
			{ where: { username: username } },
		);

		// Payload validations
		if (!username) throw this.invalidFields;
		if (!password) throw this.invalidFields;
		if (!userFromDb) throw this.incorectValues;

		const compareHash = bcrypt.compareSync(password, userFromDb.password);
		if (!compareHash) throw this.incorectValues;

		const token = generateJWT(
			{ username: userFromDb.username},
		);

		return token;
	};

	GetBalance = async (username: string): Promise<UserAndAccount> => {
		const account = await userModel.findOne({
			where: { username: username },
			include: { model: accountModel, as: 'accounts' },
		});
		
		return account as unknown as UserAndAccount;
	};

	createTransaction = async (debited: string, data: {value: number, username: string}): Promise<string> => {
		// payload validations
		if(!data.value || data.value < 0) throw this.invalidFields;
		if(!data.username) throw this.invalidFields;

		const debitedUser = await this.GetUserByUsername(debited);
		const creditedUser = await this.GetUserByUsername(data.username);
		// console.log(debitedUser.username, debitedUser.accounts.id, debitedUser.accounts.balance);
		// console.log(creditedUser.username, creditedUser.accounts.id, creditedUser.accounts.balance);
		
		// transaction validations
		if(debitedUser.accounts.balance < data.value) throw this.invalidTransation;
		if(debitedUser.accounts.id === creditedUser.accounts.id) throw this.invalidTransation;

		await accountModel.update(
			{balance: debitedUser.accounts.balance - data.value},
			{where: {id: debitedUser.accounts.id}}
		)

		await accountModel.update(
			{balance: creditedUser.accounts.balance + data.value},
			{where: {id: creditedUser.accounts.id}}
		)
		
		await transactionModel.create(
			{ 
				debitedAccountId: debitedUser.accounts.id,
				creditedAccountId: creditedUser.accounts.id,
				value: data.value,
				createdAt: new Date()
			},
		);
			
		return `successful Transaction of ${data.value} from ${debitedUser.username} to ${creditedUser.username}`;
	};

	getTransactions = async (username: string): Promise<Transaction[]> => {
		const user = await this.GetUserByUsername(username);

		const transactions = await transactionModel.findAll({
			where:{ 
				[Op.or]: [
					{ debitedAccountId: user.accounts.id},
					{ creditedAccountId: user.accounts.id }
				]}
		});
		
		return transactions as unknown as Transaction[];
	};

	getFiltredTransactions = async (username: string): Promise<Transaction[]> => {
		const user = await this.GetUserByUsername(username);

		const transactions = await transactionModel.findAll({
			where:{ 
				[Op.or]: [
					{ debitedAccountId: user.accounts.id},
					{ creditedAccountId: user.accounts.id }
				]}
		});
		return mySortTransactions(transactions) as unknown as Transaction[];
	};
}