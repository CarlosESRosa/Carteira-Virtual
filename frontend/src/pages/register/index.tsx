import React, { useState } from 'react';
import { requestRegister, requestLogin } from '../../utils/FetchAPI';
import { useNavigate } from 'react-router-dom';

const Register: React.FC = () => {
	const [stateUsername, setStateUsername] = useState('');
  const [statePassword, setStatePassword] = useState('');
	const navigate = useNavigate();

	function handleChange(event: React.FormEvent<HTMLInputElement>, setState: React.Dispatch<React.SetStateAction<string>>) {
    setState(event.currentTarget.value);
  }
	
  async function handleCreate (event: any) {
      event.preventDefault();
      await requestRegister(stateUsername, statePassword);

      const token = await requestLogin(stateUsername, statePassword)
      localStorage.setItem('token', JSON.stringify(token) )
			localStorage.setItem('user', JSON.stringify({username: 'Fred', balance: 100}) )
      navigate('/home')
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