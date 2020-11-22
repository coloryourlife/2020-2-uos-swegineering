import React from 'react'
import './navbar.css';
import { useHistory } from 'react-router-dom';
import { Cookies } from 'react-cookie';

export const Navbar = () => {
	const history = useHistory();

	const handleClick = (e) => {
		e.preventDefault();
		// console.log(Cookies)
		// Cookies.remove("session");
		// history.push('/')
		fetch('http://127.0.0.1:5000/sessionLogout', {
			method: 'POST',
			credentials: "include"
		}).then(res => {
			if(res.ok) {
				history.push('/')
			}
		})
	}
	return(
		<>
			<nav>
				<div className="nav-wrapper">
					<div className="brand-logo left black-text">미스터 대박 디너서비스</div>
					<div className="black-text right logout" onClick={handleClick}>로그아웃</div>
				</div>
			</nav>
		</>
	)
}