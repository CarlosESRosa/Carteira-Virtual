export interface User {
    id: number;
    username: string;
    password: string;
}

export interface Account {
    id: number;
    balance: number;
}

export interface UserPayload {
    username: string;
    password: string;
}

export interface IService {
    createUser(data: { username: string, password: string }): Promise<User>;
    createAccount(balance: number): Promise<Account>;
    GetUserByUsername(username: string): Promise<User | null>;
    GetAllUsers(): Promise<any>;
    login(data: UserPayload): Promise<string>;
}

