import React, { useState, useEffect } from 'react';
import Loading from '../Loading';
import { useNavigate } from 'react-router-dom';

const Home: React.FC = () => {
	const [user, setUser] = useState<{username: string, balance: number}>({username: '', balance: 0});
	const [isLoading, setIsLoading] = useState(true);
	const navigate = useNavigate();
	
	const loadDatas = async () => {
		const userLocalStorage = await JSON.parse(localStorage.getItem('user') || "");
		setUser(userLocalStorage)
		setIsLoading(false)
	}

	useEffect(() => {
    loadDatas();
  }, []);

	const logout = () => {
		localStorage.setItem('token', "" )
		localStorage.setItem('user', "" )
		navigate('/')
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
						<h4>{user.username}</h4>
					</div>
					<div>
						<i className="fa-solid fa-right-from-bracket" onClick={ logout }></i>
					</div>
				</div>
			</nav>
		</div>
	)
}

export default Home;