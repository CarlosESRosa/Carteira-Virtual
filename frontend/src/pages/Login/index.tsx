import React, { useState } from 'react';
import { requestBalance, requestLogin } from '../../utils/FetchAPI';
import { useNavigate } from 'react-router-dom';

const Login: React.FC = () => {
	const [stateUsername, setStateUsername] = useState('');
  const [statePassword, setStatePassword] = useState('');
	const navigate = useNavigate();

	function handleChange(event: React.FormEvent<HTMLInputElement>, setState: React.Dispatch<React.SetStateAction<string>>) {
    setState(event.currentTarget.value);
  }

	async function handleSubmit (event: any) {
		event.preventDefault();
		
		const token = await requestLogin(stateUsername, statePassword)
		const resultUser = await requestBalance(token);
		localStorage.setItem('token', token )
		localStorage.setItem('user', JSON.stringify(resultUser) )
		navigate('/home')
	}

	return (
		<div className='container bg-light'>
      <h1>Login</h1>
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
					onClick={ handleSubmit }
				>
					Submit
				</button>
				<button 
					onClick={ () => navigate('/register') }
					className="btn btn-dark"
				>
					Register
				</button>
			</form>
		</div>
	)
}

export default Login;