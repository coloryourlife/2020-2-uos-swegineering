import React from 'react';

export const OrderMenuStep3 = ({ currentStep, userDetails, handleDetail}) => {
	if(currentStep !== 3) return null;

	if(userDetails.length === 0) return <div className="container">로딩중...</div>
	return(
		<>
			<div className="row orderMenuStep3">
				<h5 className="left col s10 offset-s1">음식 추가/제거</h5>
				<div className="col s12">
					<div className="card darken-1" >
						<div className="card-content">
							<table>
								<thead>
									<tr>
										<th className="center">품목</th>
										<th className="center">수량</th>
										<th className="center">가격</th>
									</tr>
								</thead>
								<tbody>
									{userDetails.map(detail => (
										<tr key = {detail.name}>
											<td className="center">{detail.name}</td>
											<td className="center "><input type="number" id = {detail.name} className="quantity" value={detail.quantity} onChange={handleDetail} min="0"/></td>
											<td className="center">{detail.price}</td>
										</tr>
									))}
								</tbody>
							</table>
						</div>
					</div>
				</div>
			</div>
		</>
	) 
}