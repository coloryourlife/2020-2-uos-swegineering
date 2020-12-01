import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import firebase from 'firebase/app'
import 'firebase/auth'
import cookie from 'react-cookie'
import axios from 'axios';
import Cookies from 'js-cookie'
import './forgotpwd.css';
import firebaseConfig from '../../config/fbConfig'

export const ForgotPwd = () => {
	const [userEmail, setUserEmail] = useState([])
	const history = useHistory();

	if (!firebase.apps.length) {
		firebase.initializeApp(firebaseConfig);
	}

	const handleChange = (e) => {
		setUserEmail(e.target.value)
	}

	const sendPasswordResetEmail = (e) => {
		e.preventDefault();
		let auth = firebase.auth();
		console.log(userEmail)
		auth.sendPasswordResetEmail(userEmail).then(() => {
			alert('비밀번호 재설정 이메일을 전송하였습니다.')
			history.push('/')
		})
	}
	return (
		<>
			<div className="container forgotIdPwd">
				<div className="card forgotId">
					<div className="card-content">
						<h5 className="scorehvy">비밀번호 찾기</h5>
						<form id='forgot_password' onSubmit={sendPasswordResetEmail}>
							<div className="input-field">
								<input type="email" id="email" value={userEmail} onChange={handleChange} placeholder="아이디 이메일 주소"/>
							</div>
							<div className="input-field">
								<button className="btn right myomColor-background">비밀번호 찾기</button>
							</div>
						</form>
					</div>
				</div>
			</div>
		</>
	)
}