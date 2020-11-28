import React from 'react';

export const OrderFromHistory = ({currentStep, orderHistory, getMenu, orderByHistory}) => {
	if (currentStep !== 0) return null;
	if(orderHistory.length === 0) {
		return(
			<>
				<div>이전 주문목록이 없습니다.</div>
				<div className="btn">새로운 주문하기</div>
			</>
		)
	}
	return(
		<>
			<div className="row orderFromHistory">
				<div className="btn" onClick={getMenu}>새로운 주문하기</div>
				<h5>이전 주문 목록</h5>
				{orderHistory.map((orderList, index) => {
					return(
						<div className="col s12" key={index}>
							<div className="card darken-1">
								<div className="card-content">
									<ul>
										<li>메뉴 이름 : {orderList.menuName}</li>
										<li>스타일 : {orderList.style}</li>
										<li>수량 : {orderList.quantity}</li>
										<li>가격 : {orderList.price} </li>
									</ul>
									<div>상세품목</div>
									<table>
										<thead>
											<tr>
												<th className="center">품목</th>
												<th className="center">수량</th>
												<th className="center">가격</th>
											</tr>
										</thead>
										<tbody>
											{orderList.order_details.map(detail => (
												<tr>
													<td className="center">{detail.name}</td>
													<td className="center ">{detail.quantity}</td>
													<td className="center">{detail.price}</td>
												</tr>
											))}
										</tbody>
									</table>
								</div>
								<div className="card-action">
									<div className="btn" id={index} onClick ={orderByHistory}>주문하기</div>
								</div>
							</div>
						</div>
					)
				})}
				
			</div>
		</>
	)
}