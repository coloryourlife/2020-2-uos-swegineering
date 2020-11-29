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
			email: Yup.string().email('Invalid email address').required('필수입력사항입니다.'),
			address: Yup.string().required('필수입력사항입니다.'),
			phoneNumber: Yup.string().required('필수입력사항입니다.'),
			cardNum: Yup.string().required("필수입력사항입니다."),
			password: Yup.string().required("필수입력사항입니다."),
			privacyChecked: Yup.boolean().required("필수입력사항입니다.")
		}),
		onSubmit: values => {
			if(values['privacyChecked']){
				fetch('http://13.209.98.249:5000/auth/signup', {
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
							<input type="text" id='email' {...formik.getFieldProps('email')} placeholder="아이디(이메일)"/>
							{
								formik.touched.email && formik.errors.email ? (
									<div>{formik.errors.email}</div>
								) : null
							}
						</div>
						<div className="input-field">
							<input type="password" id='password' {...formik.getFieldProps('password')} placeholder="비밀번호"/>
							{
								formik.touched.password && formik.errors.password ? (
									<div>{formik.errors.password}</div>
								) : null
							}
						</div>
						<div className="input-field">
							<input type="text" id='name' {...formik.getFieldProps('name')} placeholder="이름"/>
							{
								formik.touched.name && formik.errors.name ? (
									<div>{formik.errors.name}</div>
								) : null
							}
						</div>
						<div className="input-field">
							<input type="text" id='address' {...formik.getFieldProps('address')} placeholder="주소"/>
							{
								formik.touched.address && formik.errors.address ? (
									<div>{formik.errors.address}</div>
								) : null
							}
						</div>
						<div className="input-field">
							<input type="text" id='phoneNumber' {...formik.getFieldProps('phoneNumber')} placeholder="전화번호"/>
							{
								formik.touched.phoneNumber && formik.errors.phoneNumber ? (
									<div>{formik.errors.phoneNumber}</div>
								) : null
							}
						</div>
						<div className="input-field">
							<input type="text" id='cardNum' {...formik.getFieldProps('cardNum')} placeholder = "카드번호"/>
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