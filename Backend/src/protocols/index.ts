export interface User {
	id: number;
	username: string;
	password: string;
	accountId: number;
}

export interface Account {
	id: number;
	balance: number;
}

export interface UserPayload {
	username: string;
	password: string;
}

export interface UserAndAccount {
	id: number;
	username: string;
	password: string;
	accountId: number;
	accounts: {id: number, balance: number}
}

export interface IService {
	createUser(data: { username: string, password: string }): Promise<User>;
	createAccount(balance: number): Promise<Account>;
	GetUserByUsername(username: string): Promise<UserAndAccount>;
	login(data: UserPayload): Promise<string>;
	GetBalance(username: string): Promise<UserAndAccount>;
	createTransaction(debited: string, data: {value: number, username: string}): Promise<string>;
}

