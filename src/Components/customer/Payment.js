import React from 'react';

export const Payment = ({ currentStep, order }) => {
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
							<div className="cardNum-container">
								<span>카드번호</span>
								<input className="cardNum"type="text" maxLength="4"/>
								<input className="cardNum" type="text" maxLength="4" />
								<input className="cardNum" type="text" maxLength="4" />
								<input className="cardNum" type="text" maxLength="4" />
							</div>
						</div>
						<div className="card-action">
						<button className="waves-effect waves-light btn">결제하기</button>
						</div>
					</div>
				</div>
			</div>
		</>
	)
}