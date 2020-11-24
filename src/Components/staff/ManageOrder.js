import React, { useState, useEffect } from 'react';
import { Navbar } from '../layout/Navbar';

export const ManageOrder = () => {
	const [orderList, setOrderList] = useState([])

	useEffect(() => {
		fetch('http://127.0.0.1:5000/orderList', {
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
			setOrderList(data.orderList)
			console.log(data)
		})
	}, [])

	const handleStatus = (e) => {
		
	}
	return (
		<>
			<Navbar />
			<div className="container manageOrder">
				<div className="card col s12">
					<h4>주문 관리</h4>
					<div className="card-content">
						{orderList.map((item) => {
							return (
								<div className="card col s12" key={item.name}>
									<div className="card-content">
										<ul>
											<li>배달 주소 : {item.address}</li>
											<li>전화번호 : {item.phoneNumber}</li>
											<li>주문 메뉴 : {item.menuName}</li>
											<li>주문 스타일 : {item.style}</li>
											<li>주문 수량 : {item.quantity}세트</li>
										</ul>
										<table>
											<thead>
												<tr>
													<th className="center">품목</th>
													<th className="center">수량</th>
												</tr>
											</thead>
											<tbody>
												{item.order_details.map(detail => (
													<tr key={detail.name}>
														<td className="center">{detail.name}</td>
														<td className="center ">{detail.quantity}</td>
													</tr>
												))}
											</tbody>
										</table>
									</div>
									<div className="card-action">
										<button className="waves-effect waves-light btn" value={item.orderStatus}>{item.orderStatus}</button>
									</div>
								</div>
							)
						})}
					</div>
				</div>
			</div>
		</>
	)
}