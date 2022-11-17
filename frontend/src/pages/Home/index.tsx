import React, { useState, useEffect } from 'react';
import Loading from '../Loading';
import { useNavigate } from 'react-router-dom';
import { requestTransference } from '../../utils/FetchAPI';

const Home: React.FC = () => {
	const [userData, setUserData] = useState<{username: string, balance: number}>({username: '', balance: 0});
	const [balanceValue, setBalanceValue] = useState(0);
	const [usernameToTransfer, setUsernameToTransfer] = useState('');
	const [isLoading, setIsLoading] = useState(true);
	const navigate = useNavigate();
	
	const loadDatas = async () => {
		const userLocalStorage = await JSON.parse(localStorage.getItem('user') || "");
		setUserData(userLocalStorage)
		setIsLoading(false)
	}

	useEffect(() => {
    loadDatas();
  }, []);

	useEffect(() => {
		if(!isLoading){
			localStorage.setItem('user', JSON.stringify(userData) )
		}
	}, [userData]);

	const logout = () => {
		localStorage.setItem('token', "" )
		localStorage.setItem('user', "" )
		navigate('/')
	}

	function handleChangeBalance(event: React.FormEvent<HTMLInputElement>, setState: React.Dispatch<React.SetStateAction<number>>) {
		setState(Number(event.currentTarget.value));
  }

	function handleChangeUsername(event: React.FormEvent<HTMLInputElement>, setState: React.Dispatch<React.SetStateAction<string>>) {
		setState(event.currentTarget.value);
  }

	async function handleClick() {
		const token = localStorage.getItem('token') || "";
		await requestTransference(balanceValue, usernameToTransfer, token )
		const aux = {
			username: userData.username,
			balance: userData.balance - balanceValue
		}
		setUserData(aux)
	}

	if(isLoading) {
		return <Loading/>;
	} 

	return (
		<div className='container-fluid home-page'>
			<nav className="navbar fixed-top my-navbar">
				<img className='navbar-brand' src="https://ng.cash/_nuxt/img/logo-ngcash-branco.88c5860.svg" alt='Logo NG.CASH'/>
				<div className='my-navbar-seeds'>
					<div className='nav-character'>
						<i className="fa-solid fa-user"></i>
						<h4>{userData.username}</h4>
					</div>
					<div>
						<i className="fa-solid fa-right-from-bracket" onClick={ logout }></i>
					</div>
				</div>
			</nav>
			<div className='section1-container'>
				<div className='row section1-row'>
					<div className='col col-left'>
						<div>
							<h1>{`Saldo: R$ ${userData.balance}`}</h1>
						</div>
						<div className='section1-transfer'>
							<h3>Transferir</h3>
							<div>
								<div className='section1-transfer-row row'>
									<input 
										className="form-control"
										type='number'
										value={ balanceValue }
										onChange={ (event) => handleChangeBalance(event, setBalanceValue)}
										placeholder='Value'
									></input>
									<input
										className="form-control"
										type='text'
										value={ usernameToTransfer }
										onChange={ (event) => handleChangeUsername(event, setUsernameToTransfer)}
										placeholder='@Username'
									></input>
								</div>
								<div className='section1-transfer-button row'>
										<button className='btn btn-dark' onClick={ handleClick }>Enviar</button>
								</div>
							</div>
						</div>
					</div>
					<div className='col'>
						<img src="https://ng.cash/_nuxt/img/home-ngcash-app.49e176e.png" alt='NG.CASH App'/>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Home;