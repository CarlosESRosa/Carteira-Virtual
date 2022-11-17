import axios from 'axios';

type loginResponse = {
	token: string;
}

export const requestLogin = async (username: string, password: string) => {
	try {
    // 👇️ const data: loginResponse
    const { data } = await axios.post<loginResponse>(
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
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log('error message: ', error.message);
      // 👇️ error: AxiosError<any, any>
      return error.message;
    } else {
      console.log('unexpected error: ', error);
      return 'An unexpected error occurred';
    }
  }
}

export const requestRegister = async (username: string, password: string) => {
	try {
    // 👇️ const data: loginResponse
    const { data } = await axios.post<loginResponse>(
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
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log('error message: ', error.message);
      // 👇️ error: AxiosError<any, any>
      return error.message;
    } else {
      console.log('unexpected error: ', error);
      return 'An unexpected error occurred';
    }
  }
}