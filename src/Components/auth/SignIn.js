import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import cookie from 'react-cookie'
import axios from 'axios';
import './signin.css';

export const SignIn = (props) => {
	const [loginInfo, setLoginInfo] = useState([])
	const [cookie, setCookie] = useState([])
	const history = useHistory();

	const handleSubmit = (e) => {
		e.preventDefault();
		fetch('http://127.0.0.1:5000/api/token', {
			method: 'POST',
			headers:{
				"Content-type": "application/json; charset=UTF-8"
			},
			body : JSON.stringify(loginInfo)
		}).then(res => {
			return res.json()
		}).then((data) => {
			fetch('http://127.0.0.1:5000/api/sessionInit',{
				method: 'POST',
				headers:{
					'Authorization' : data.token
				},
				credentials: "include"
			}).then((res)=>{
				history.push('/order')
			})
		})
	}

	const handleChange = (e) => {
		setLoginInfo({
			...loginInfo,
			[e.target.id] : e.target.value
		})
	}
	return (
		<>
			<div className="container signin">
				<div className="card">
					<div className="card-image">
						<img src="img/logo.png" alt=""/>
					</div>
					<div className="card-content">
						<span className="card-title scorehvy center">로그인</span>
						<form action="" onSubmit={handleSubmit} className='white'>
							<div className="input-field">
								<label htmlFor="email">아이디</label>
								<input type="email" id='email' onChange={handleChange} />
							</div>
							<div className="input-field">
								<label htmlFor="password">비밀번호</label>
								<input type="password" id='password' onChange={handleChange}/>
							</div>
							<div className="input-field center">
								<button className="btn myomColor-background lighten-1">로그인</button>
								<div className="red-text center"></div>
							</div>
							<div className="forgotidpwd center">
								<Link to='/' className='myomColor'>아이디/비밀번호찾기</Link>
							</div>
						</form>
					</div>
				</div>
			</div>
		</>
	)
}