import React from 'react';

export const Payment = ({ currentStep, order, userInfo,handleChange, handleSubmit,handleDate }) => {
	if (currentStep !== 5) return null;

	if (order.length === 0) return <div className="container">로딩중...</div>
	return (
		<>
			<div className="row payment">
				<h5 className="left col s10 offset-s1">결제</h5>
				<div className="col s12">
					<div className="card darken-1" >
						<div className="card-content">
							<span className="card-title">결제금액</span>
							<div>{order.price}원</div>
							<div>주문자 : {userInfo.name}</div>
							<div>회원 등급 : {userInfo.level}</div>
							<div className="input-field">
								주소
								<input className="center"type="text" id='address'onChange={handleChange} value={userInfo.address}/>
							</div>
							<div className="input-field col s12 m6 l6">
								날짜
								<input className="center"type="date" id="date" onChange={handleDate}/>
							</div>
							<div className="input-field col s12 m6 l6">
								시간
								<input className="center" type="time" id="time" onChange={handleDate} />
							</div>
							<div className="cardNum-container">
								<span>카드번호</span>
								<input className="center" id="cardNum"type="text" maxLength="16" value={userInfo.cardNum} onChange={handleChange}/>
							</div>
						</div>
						<div className="card-action">
						<button className="waves-effect waves-light btn" onClick={handleSubmit}>결제하기</button>
						</div>
					</div>
				</div>
			</div>
		</>
	)
}