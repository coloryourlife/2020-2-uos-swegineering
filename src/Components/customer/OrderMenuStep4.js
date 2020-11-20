import React from 'react';

export const OrderMenuStep4 = ({ currentStep, order}) => {
	if (currentStep !== 4) return null;

	if (order.length === 0) return <div className="container">로딩중...</div>
	return (
		<>
			<div className="row orderMenuStep4">
				<h5 className="left col s10 offset-s1">주문 확인</h5>
				<div className="col s12">
					<div className="card darken-1" >
						<div className="card-content">
							<div>주문 메뉴 : {order.menuName}</div>
							<div>스타일 : {order.style} ({order.style_price}원 * {order.style_quantity} 인)</div>
							<table className="center">
								<thead>
									<tr>
										<th className="center">품목</th>
										<th className="center">수량</th>
										<th className="center">가격</th>
									</tr>
								</thead>
								<tbody>
									{order.details.map(detail => (
										<tr key={detail.name}>
											<td className="center">{detail.name}</td>
											<td className="qtd center">{detail.quantity}</td>
											<td className="center">{detail.price * detail.quantity}</td>
										</tr>
									))}
								</tbody>
							</table>
							<div className="priceAll"> 총 금액 : {order.price}</div>
						</div>
					</div>
				</div>
			</div>
		</>
	)
}