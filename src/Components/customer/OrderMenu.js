import React, {useState, useEffect } from 'react';
import './orderMenu.css';
import { Loader } from '../functionalComponents/Loader';
import { OrderMenuStep1 } from './OrderMenuStep1';
import { OrderMenuStep2 } from './OrderMenuStep2';
import { OrderMenuStep3 } from './OrderMenuStep3';
import { OrderMenuStep4 } from './OrderMenuStep4';
import { Navbar } from '../layout/Navbar';
import { Payment } from './Payment';
import { Link, useLocation } from 'react-router-dom'

export const OrderMenu = () => {
	const [step, setStep] = useState(1)
	const [menuList, setMenuList] = useState([])
	const [menu, setMenu] = useState([])
	const [style, setStyle] = useState([])
	const [styleList, setStyleList] = useState([])
	const [details, setDetails] = useState([])
	const [order, setOrder] = useState([])
	const [userInfo, setUserInfo] = useState([])
	const location = useLocation()

	useEffect(() => {
		fetch('http://127.0.0.1:5000/api',{
			method:'POST',
			headers:{
				"Content-type": "application/json; charset=UTF-8"
			},
			credentials:'include',
			body : JSON.stringify(location.state)
		}).then(res => {
			if(res.ok){
				return res.json()
			}
		}).then((data) => {
			console.log(data)
			setMenuList(data.result)
			console.log(data.userInfo)
		})
	},[])

	const _next = (e) => {
		e.preventDefault();
		let currentStep = step;
		currentStep = currentStep >= 3 ? 4 : currentStep + 1;
		setStep(currentStep);
		let price = 0;
		let d = {...details};
		let detail = []
		price = style.quantity * style.price;
		for(let i = 0 ; i < 10; i ++){
			if(d[i].quantity > 0){
				price += d[i].price * d[i].quantity;
				detail.push(d[i])
			}
		}
		setOrder({
			menuName : menu.name,
			style : style.name,
			style_price : style.price,
			style_quantity: style.quantity,
			details : detail,
			price : price
		})
		window.scrollTo(0,0);
	}

	const _prev = (e) => {
		e.preventDefault();
		let currentStep = step;
		currentStep = currentStep <= 1 ? 1 : currentStep - 1;
		setStep(currentStep);
	}

	const handleChange = (e) => {
		let m = { ...menuList }
		let menu_update = []
		for(let i = 0; i < 3; i ++){
			if(m[i].name==e.target.id) m[i].quantity = e.target.value;
			menu_update.push(m[i])
		}
		setMenuList(menu_update);
	}

	const handleMenu = (e) => {
		if((e.target.id ==="샴페인 축제 디너(Champagne Feast dinner)") && (e.target.value === "1")){
			alert("샴페인 축제디너는 2인분 이상 주문하셔야 합니다.")
		}
		else if(e.target.value ==="0"){
			alert("최소 1인분 이상은 주문해주셔야 합니다.")
		}
		else{
			let currentStep = step;
			currentStep = currentStep >= 3 ? 4 : currentStep + 1;
			setStep(currentStep);
			setMenu({
				name : e.target.id,
				quantity : e.target.value
			});
			fetch(`http://127.0.0.1:5000/api/${e.target.id}`)
			.then(res => {
				if(res.ok){
					return res.json()
				}
			}).then((data) => {
				setStyleList(data.result)
			})
		}
	}

	const handleStyle = (e) => {
		let currentStep = step;
		currentStep = currentStep >= 3 ? 4 : currentStep + 1;
		setStep(currentStep);
		setStyle({
			name : e.target.id,
			quantity : menu.quantity,
			price : e.target.value
		});
		fetch(`http://127.0.0.1:5000/order/${menu.name}`)
		.then(res => {
			if(res.ok){
				return res.json()
			}
		}).then((data) => {
			let d = data.result[0].details
			let detail = []
			for(let i = 0; i < 10; i ++){
				if(d[i].quantity > 0) d[i].quantity = d[i].quantity * menu.quantity 
				detail.push(d[i])
			}
			setDetails(detail)
		})
	}

	const handleDetail = (e) => {
		let d={...details}
		let detail = []
		for(let i = 0; i < 10; i++){
			if(d[i].name == e.target.id) d[i].quantity = e.target.value;
			detail.push(d[i])
		}
		setDetails(detail);
	}

	const _payment = (e) => {
		let currentStep = step;
		currentStep = currentStep >= 4 ? 5 : currentStep + 1;
		setStep(currentStep);
	}


	return(
		<>
			<Navbar/>
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
						<OrderMenuStep1 handleMenu = {handleMenu} currentStep = {step} menuList={menuList} handleChange={handleChange} />
						<OrderMenuStep2 handleStyle={handleStyle} currentStep = {step} styleList={styleList}/>
						<OrderMenuStep3 currentStep = {step} userDetails={details} handleDetail={handleDetail}/>
						<OrderMenuStep4 currentStep={step} order = {order} />
						<Payment currentStep={step} order={order} />
					</div>
					<div className="card col s12 z-depth-0 hidden">
						{step === 3? <div onClick = {_next} className="btn blue darken-4 right">다음</div> : null}
						{step !== 1 ? <div onClick = {_prev} className="btn grey darken-2 left">이전</div> : null}
						{step === 4 ? <button onClick={_payment}className='btn red lighten-3 right'>결제하기</button> : null}
					</div>
				</form>
			</div>
		</>
	)
}