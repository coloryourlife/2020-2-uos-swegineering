import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './signin.css';

export const SignIn = () => {
	const [email, setEmail] = useState([])
	const [password, setPassword] = useState([])

	const handleSubmit = () => {
		console.log('aaa')
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
								<input type="email" id='email' onChange={handleSubmit} />
							</div>
							<div className="input-field">
								<label htmlFor="password">비밀번호</label>
								<input type="password" id='password' onChange={handleSubmit}/>
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