import React, { useState } from 'react';
import { requestRegister, requestLogin, requestBalance, requestGetTransactions } from '../../utils/FetchAPI';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Register: React.FC = () => {
	const [stateUsername, setStateUsername] = useState('');
  const [statePassword, setStatePassword] = useState('');
	const navigate = useNavigate();

	function handleChange(event: React.FormEvent<HTMLInputElement>, setState: React.Dispatch<React.SetStateAction<string>>) {
    setState(event.currentTarget.value);
  }
	
  async function handleCreate (event: any) {
		event.preventDefault();
		try {
			await requestRegister(stateUsername, statePassword);
			const token = await requestLogin(stateUsername, statePassword)
			const resultUser = await requestBalance(token);
			const userTransactions = await requestGetTransactions(token)
		
			const result = {
				username: resultUser.username,
				balance: resultUser.balance,
				transactions: userTransactions
			}
			
			localStorage.setItem('token', token )
			localStorage.setItem('user', JSON.stringify(result) )
			navigate('/home')
		} catch (error) {
			if (axios.isAxiosError(error)) {
				console.log('error message: ', error.message);
				// 👇️ error: AxiosError<any, any>
				alert(error.message)
				return error.message;
			} else {
				console.log('unexpected error: ', error);
				return 'An unexpected error occurred';
			}
		}
	}

	return (
		<div className='container bg-light'>
      <h1>Register</h1>
			<form className='w-50'>
				<div className="mb-3">
					<label htmlFor="username" className="form-label">Username</label>
					<input 
						type="text"
						value={ stateUsername }
						onChange={ (event) => handleChange(event, setStateUsername)}
						className="form-control"
						id="username"
					/>
				</div>
				<div className="mb-3">
					<label htmlFor="password" className="form-label">Password</label>
					<input 
						type="password"
						value={ statePassword }
						onChange={ (event) => handleChange(event, setStatePassword)}
						className="form-control"
						id="password"
					/>
				</div>
				<button 
					type='submit'
					className="btn btn-dark"
					onClick={ handleCreate }
				>
					Create
				</button>
			</form>
		</div>
	)
}

export default Register;