import React, {useState, useEffect} from 'react';
import { Navbar } from '../layout/Navbar';
import {useLocation} from 'react-router-dom'

export const OrderDone = () => {
	const location = useLocation()
	let myOrder = location.state.myOrder
	return (
		<>
			<Navbar />
			<div className="container orderDone">
				<div className="card col s12">
					<h4 className="center">주문이 완료되었습니다.</h4>
					<h5>주문 상세</h5>
					{myOrder.map((order) => {
						return(
							<>
							<div className="card-content"key={order.name}>
								<div>주문자 : {order.name}</div>
								<div>주소 : {order.address}</div>
								<div>날짜 : {order.date}</div>
								<div>시간 : {order.time}</div>
								<div>전화번호 : {order.phoneNumber}</div>
								<div>코스 : {order.menuName}</div>
								<div>스타일 : {order.style}</div>
								<div>수량 : {order.quantity} 인분</div>
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
										{order.order_details.map(detail => (
											<tr>
												<td className="center">{detail.name}</td>
												<td className="center ">{detail.quantity}</td>
												<td className="center">{detail.price}</td>
											</tr>
										))}
									</tbody>
								</table>
							</div>
							</>
						)
					})}
				</div>
			</div>
		</>
	)
}

