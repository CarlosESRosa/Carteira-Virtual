import axios from 'axios';

type balanceResponse = {
	username: string;
  balance: number;
}

type registerResponse = {
	id: number;
  username: string;
  password: string;
  accountId: number;
}

type getTransactionsResponse = {
	id: number;
	debitedAccountId: number;
	creditedAccountId: number;
	value: number;
  accountId: Date;
}

export const requestLogin = async (username: string, password: string) => {
	const { data } = await axios.post<string>(
    'http://localhost:3001/login',
    { username: username, password: password },
    {
      headers: {
        'Content-Type': 'application/json',
        // Accept: 'application/json',
      },
    },
  );

  console.log(JSON.stringify(data, null, 4));

  return data;
}

export const requestRegister = async (username: string, password: string) => {
  const { data } = await axios.post<registerResponse>(
    'http://localhost:3001/register',
    { username: username, password: password },
    {
      headers: {
        'Content-Type': 'application/json',
        // Accept: 'application/json',
      },
    },
  );

  console.log(JSON.stringify(data, null, 4));

  return data;
}

export const requestBalance = async (token: string): Promise<balanceResponse> => {
  const { data } = await axios.get<balanceResponse>(
    'http://localhost:3001/balance',
    {
      headers: {
        'Authorization': token,
      },
    },
  );
  console.log(data);
  
  return data;
}

export const requestTransference = async (value: number, username: string, token: string) => {
  const { data } = await axios.post<string>(
    'http://localhost:3001/transaction',
    { value: value, username: username },
    {
      headers: {
        'Authorization': token,
      },
    },
  );

  console.log(JSON.stringify(data, null, 4));

  return data;
}

export const requestGetTransactions = async (token: string) => {
  const { data } = await axios.get<getTransactionsResponse[]>(
    'http://localhost:3001/transactions',
    {
      headers: {
        'Authorization': token,
      },
    },
  );

  console.log(JSON.stringify(data, null, 4));

  return data;
}