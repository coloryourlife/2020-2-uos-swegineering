import React, {useState, useEffect } from 'react';
import './orderMenu.css';
import { Loader } from '../functionalComponents/Loader';
import { OrderMenuStep1 } from './OrderMenuStep1';
import { OrderMenuStep2 } from './OrderMenuStep2';
import { OrderMenuStep3 } from './OrderMenuStep3';
import { OrderMenuStep4 } from './OrderMenuStep4';
import { Navbar } from '../layout/Navbar';
import { Payment } from './Payment';
import { Link, useLocation, useHistory } from 'react-router-dom'
import { set } from 'js-cookie';
import { OrderFromHistory } from './OrderFromHistory';

export const OrderMenu = () => {
	const [step, setStep] = useState(0)
	const [orderHistory, setOrderHistory] = useState([])
	const [menuList, setMenuList] = useState([])
	const [menu, setMenu] = useState([])
	const [style, setStyle] = useState([])
	const [styleList, setStyleList] = useState([])
	const [details, setDetails] = useState([])
	const [order, setOrder] = useState([])
	const [userInfo, setUserInfo] = useState([])
	const location = useLocation()
	const history = useHistory()

	useEffect(() => {
		fetch(`http://13.209.98.249:5000/order/orderHistory/${location.state.email}`, {
			method: 'GET',
			headers: {
				"Content-type": "application/json; charset=UTF-8"
			},
			credentials: 'include'
		}).then(res => {
			if(res.ok){
				return res.json()
			}
		}).then((data) => {
			setUserInfo(location.state.userInfo[0])
			setOrderHistory(data.orderHistory)
		})
	},[])

	const getMenu = (e) => {
		e.preventDefault();
		let currentStep = step;
		currentStep = currentStep + 1;
		setStep(currentStep)
		fetch('http://13.209.98.249:5000/order/menu', {
			method: 'GET',
			headers: {
				"Content-type": "application/json; charset=UTF-8"
			},
			credentials: 'include',
		}).then(res => {
			if (res.ok) {
				return res.json()
			}
		}).then((data) => {
			setMenuList(data.result)
		})
	}

	const orderByHistory = (e) => {
		e.preventDefault();
		let i = e.target.id
		let currentStep = step;
		currentStep = currentStep + 5;
		setStep(currentStep);
		setOrder({
			menuName : orderHistory[i].menuName,
			style: orderHistory[i].style,
			style_quantity: orderHistory[i].quantity,
			details: orderHistory[i].order_details,
			price : orderHistory[i].price
		})
	}

	const _next = (e) => {
		e.preventDefault();
		let currentStep = step;
		currentStep = currentStep >= 3 ? 4 : currentStep + 1;
		setStep(currentStep);
		let price = 0;
		let discount = 0;
		let d = {...details};
		let detail = []
		price = style.quantity * style.price;
		for(let i = 0 ; i < 10; i ++){
			if(d[i].quantity > 0){
				price += d[i].price * d[i].quantity;
				detail.push(d[i])
			}
		}
		switch(userInfo.level){
			case 'bronze': 
				discount = 1
				break;
			case 'silver': 
				discount = 0.9
				break;
			case 'gold' : 
				discount = 0.8
				break;
			case 'platinum' : 
				discount = 0.7
				break;
			default: discount = 1
		}
		setOrder({
			menuName : menu.name,
			style : style.name,
			style_price : style.price,
			style_quantity: style.quantity,
			details : detail,
			price : price*discount
		})
		window.scrollTo(0,0);
	}

	const _prev = (e) => {
		e.preventDefault();
		let currentStep = step;
		currentStep = currentStep <= 0 ? 0 : currentStep - 1;
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
		e.preventDefault()
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
			fetch(`http://13.209.98.249:5000/order/style/${e.target.id}`)
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
		fetch(`http://13.209.98.249:5000/order/details/${menu.name}`)
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

	const changeUser = (e) => {
		let u = {...userInfo}
		u[e.target.id] = e.target.value;
		setUserInfo(u);
	}

	const _payment = (e) => {
		let currentStep = step;
		currentStep = currentStep >= 4 ? 5 : currentStep + 1;
		setStep(currentStep);
	}

	const setDate = (e) => {
		e.preventDefault()
		setOrder({
			...order,
			[e.target.id] : e.target.value
		})
	}

	const _done = (e) => {
		e.preventDefault();
		fetch('http://13.209.98.249:5000/order/done', {
			method:'POST',
			headers: {
				"Content-type": "application/json; charset=UTF-8"
			},
			body : JSON.stringify({'orderInfo' : order, 'user':userInfo}),
			credentials:'include'
		}).then(res => {
			if(res.ok){
				return res.json()
			}
		}).then((data) => {
			history.push({
				pathname: '/orderDone',
				state: {'myOrder':data.myOrder}
			})
		})
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
						<OrderFromHistory orderHistory={ orderHistory} getMenu = {getMenu} currentStep = {step} orderByHistory = {orderByHistory}/>
						<OrderMenuStep1 handleMenu = {handleMenu} currentStep = {step} menuList={menuList} handleChange={handleChange} />
						<OrderMenuStep2 handleStyle={handleStyle} currentStep = {step} styleList={styleList}/>
						<OrderMenuStep3 currentStep = {step} userDetails={details} handleDetail={handleDetail}/>
						<OrderMenuStep4 currentStep={step} order = {order} />
						<Payment currentStep={step} order={order} userInfo={userInfo} handleChange={changeUser} handleSubmit={_done} handleDate={setDate}/>
					</div>
					<div className="card col s12 z-depth-0 hidden">
						{step === 3? <div onClick = {_next} className="btn blue darken-4 right">다음</div> : null}
						{step !== 0 && step !== 5? <div onClick = {_prev} className="btn grey darken-2 left">이전</div> : null}
						{step === 4 ? <button onClick={_payment}className='btn red lighten-3 right'>결제하기</button> : null}
					</div>
				</form>
			</div>
		</>
	)
}