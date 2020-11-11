import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import './signup.css'

export const SignUp = () => {
	const [email, setEmail] = useState([])
	const [password, setPassword] = useState([])
	const [name, setName] = useState([])
	const [cardNum, setcardNum] = useState([])
	const [address, setAddress] = useState([])
	const [phoneNumber, setPhoneNumber] = useState([])
	const [privacyChecked, setPrivacyChecked] = useState([])


	const handleSubmit = () => {
		console.log('aaa')
	}

	const handleChange = (inputValue) => {
		setEmail(inputValue)
	}

	const handlePasswordChange = (inputValue) => {
		setPassword(inputValue)
	}

	const handleNameChange = (inputVal) => {
		setName(inputVal)
	}

	const handleAddressChange = (inputVal) => {
		setAddress(inputVal)
	}

	const handlePhoneNumChange = (inputVal) => {
		setPhoneNumber(inputVal)
	}

	const handleCardChange = (inputVal) => {
		setcardNum(inputVal)
	}

	const handleCheck = (inputVal) => {
		setPrivacyChecked(inputVal);
	}

	return (
		<>
			<div className="container signup">
				<form action="" id="signUp_submit">
					<div className="card">
						<div className="card-content">
							<h5 className="grey-text text-darken-3">회원가입</h5>
							<div className="input-field">
								<label htmlFor="email">아이디</label>
								<input type="email" id = 'email' onChange={handleChange} required/>
							</div>
							<div className="input-field">
								<label htmlFor="password">비밀번호</label>
								<input type="password" id="password" onChange={handlePasswordChange} required/>
							</div>
							<div className="input-field">
								<label htmlFor="name">이름</label>
								<input type="text" id="name" onChange={handleNameChange} required/>
							</div>
							<div className="input-field">
								<label htmlFor="address">주소</label>
								<input type="text" id="address" onChange={handleAddressChange} required />
							</div>
							<div className="input-field">
								<label htmlFor="phone">핸드폰번호</label>
								<input type="text" id="phone" onChange={handlePhoneNumChange} required />
							</div>
							<div className="input-field">
								<label htmlFor="card">카드번호</label>
								<input type="text" id="card" onChange={handleCardChange} required />
							</div>
						</div>
					</div>
					<div className="card terms">
						<div className="card-content">
							<p>
								<label htmlFor="privacy">
									<input type="checkbox" id="privacy" onChange = {handleCheck}/>
									<span>개인정보 수집 및 이용에 대한 안내(필수)</span>
								</label>
							</p>
							<div className="input-field center signupBtn">
								<button className="btn indigo lighten-1">회원가입</button>
							</div>
						</div>
					</div>
				</form>
			</div>
		</>
	)
}
