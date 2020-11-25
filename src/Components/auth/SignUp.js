import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useHistory,Redirect } from 'react-router-dom';
import './signup.css'

export const SignUp = () => {
	const history = useHistory();
	const formik = useFormik({
		initialValues: {
			name : '',
			email : '',
			address : '',
			phoneNumber: '',
			cardNum : '',
			password : '',
			privacyChecked: false
		},
		validationSchema: Yup.object({
			name: Yup.string().required('필수입력사항입니다.'),
			email: Yup.string().email('Invalid email address').required('Required'),
			address : Yup.string().required('Required'),
			phoneNumber : Yup.string().required('Required'),
			cardNum : Yup.string().required("Required"),
			password: Yup.string().required("Required"),
			privacyChecked: Yup.boolean().required("Required")
		}),
		onSubmit: values => {
			if(values['privacyChecked']){
				fetch('http://127.0.0.1:5000/api/signup', {
					method: 'POST',
					headers: {
						"Content-type":"application/json; charset=UTF-8"
					},
					body : JSON.stringify(values)
				}).then(() => {
					history.push('/')
				})
			}else{alert('개인정보 처리방침에 동의해주셔야합니다.')}
		},
	});
	return(
		<div className="container signup">
			<form onSubmit = {formik.handleSubmit} id="signUp_submit">
				<div className="card">
					<div className="card-content">
						<h5 className="grey-text text-darken-3">회원가입</h5>
						<div className="input-field">
							<label htmlFor="email">아이디</label>
							<input type="text" id='email' {...formik.getFieldProps('email')}/>
							{
								formik.touched.email && formik.errors.email ? (
									<div>{formik.errors.email}</div>
								) : null
							}
						</div>
						<div className="input-field">
							<label htmlFor="password">비밀번호</label>
							<input type="password" id='password' {...formik.getFieldProps('password')} />
							{
								formik.touched.password && formik.errors.password ? (
									<div>{formik.errors.password}</div>
								) : null
							}
						</div>
						<div className="input-field">
							<label htmlFor="name">이름</label>
							<input type="text" id='name' {...formik.getFieldProps('name')} />
							{
								formik.touched.name && formik.errors.name ? (
									<div>{formik.errors.name}</div>
								) : null
							}
						</div>
						<div className="input-field">
							<label htmlFor="address">주소</label>
							<input type="text" id='address' {...formik.getFieldProps('address')} />
							{
								formik.touched.address && formik.errors.address ? (
									<div>{formik.errors.address}</div>
								) : null
							}
						</div>
						<div className="input-field">
							<label htmlFor="phoneNumber">전화번호</label>
							<input type="text" id='phoneNumber' {...formik.getFieldProps('phoneNumber')} />
							{
								formik.touched.phoneNumber && formik.errors.phoneNumber ? (
									<div>{formik.errors.phoneNumber}</div>
								) : null
							}
						</div>
						<div className="input-field">
							<label htmlFor="cardNum">카드번호</label>
							<input type="text" id='cardNum' {...formik.getFieldProps('cardNum')} />
							{
								formik.touched.cardNum && formik.errors.cardNum ? (
									<div>{formik.errors.cardNum}</div>
								) : null
							}
						</div>
					</div>
				</div>
				<div className="card terms">
					<div className="card-content">
						<p>
							<label htmlFor="privacyChecked">
								<input type="checkbox" id="privacyChecked" {...formik.getFieldProps('privacyChecked')}/>
								{
									formik.touched.privacyChecked && formik.errors.cardprivacyChecked ? (
										<div>{formik.errors.privacyChecked}</div>
									) : null
								}
								<span>개인정보 수집 및 이용에 대한 안내(필수)</span>
							</label>
						</p>
						<div className="input-field center signupBtn">
							<button type="submit" className="btn indigo lighten-1">회원가입</button>
						</div>
					</div>
				</div>
			</form>
		</div>
	)
}