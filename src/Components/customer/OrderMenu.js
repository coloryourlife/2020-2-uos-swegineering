import React, {useState, useEffect } from 'react';
import './orderMenu.css';
import { Loader } from '../functionalComponents/Loader';
import { OrderMenuStep1 } from './OrderMenuStep1';

export const OrderMenu = () => {
	const [step, setStep] = useState([1])
	const [menuList, setMenuList] = useState([])
	const [menu, setMenu] = useState([])
	const [style, setStyle] = useState([])
	const [details, setDetails] = useState([])

	useEffect(() => {
		fetch('http://127.0.0.1:5000/api').then(res => {
			if(res.ok){
				return res.json()
			}
		}).then((data) => {
			setMenuList(data.result)
		})
	},[])

	const _next = (e) => {
		e.preventDefault();
		let currentStep = step;
		currentStep = currentStep >= 3 ? 4 : currentStep + 1;
		setStep(currentStep);
		window.scrollTo(0,0);
	}

	const _prev = (e) => {
		e.preventDefault();
		let currentStep = step;
		currentStep = currentStep <= 1 ? 1 : currentStep - 1;
		setStep(currentStep);
	}

	const handleMenu = (e) => {
		e.preventDefault();
		setMenu(e);
	}

	return(
		<>
			<div className="container orderMenu">
				<div id="hidden-for-loading">
					<Loader />
					<div className="progress for-loading">
						<div style={{width: '0%'}} className="determinate"></div>
					</div>
				</div>

				<div className="row progress-bar">
					<div className="progress col s12" style={{height: '.8rem'}}>
						<div style={{width: Math.floor(25*step) + '%'}} className="determinate"></div>
					</div>
				</div>

				<form action="" className="row">
					<div className="card col s12">
						<h4 className="center">MR.대박 디너서비스를 찾아주셔서 감사합니다.</h4>
						<h6 className="center" style={{marginBottom:'3rem'}}>아래의 주문서를 작성해주시면 완벽한 서비스로 보답하겠습니다.</h6>
						<OrderMenuStep1 menu={menu} handleMenu = {handleMenu} currentStep = {step} menuList={menuList}/>
					</div>
					<div className="card col s12 z-depth-0 hidden">
						{step < 4 ? <div onClick = {_next} className="btn blue darken-4 right">다음</div> : null}
						{step !== 1 ? <div onClick = {_prev} className="btn grey darken-2 left">이전</div> : null}
						{step == 4 ? <button className = 'btn red lighten-3 right'>결제하기</button> : null}
					</div>
				</form>
			</div>
		</>
	)
}