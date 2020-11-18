import React from 'react';

export const OrderMenuStep3 = ({ menu, style, currentStep, styleList ,detailList}) => {
	if(currentStep !== 3) return null;

	const noEnter = (e) => {
		if(e.keyCode === 13) e.preventDefault();
	}
	if(detailList.length == 0) return <div className="container">로딩중...</div>
	let details = {};

	return(
		<>
			<div className="row orderMenuStep3">
				<h5 className="left col s10 offset-s1">음식 추가/제거</h5>
				<div className="col s12">
					<div className="card darken-1" >
						<div className="card-content">
							<span className="card-title">목록</span>
							<table>
								<thead>
									<tr>
										<th>품목</th>
										<th>수량</th>
										<th>가격</th>
									</tr>
								</thead>
								<tbody>
									{detailList.map(detail => (
										<tr key = {detail.name}>
											<td>{detail.name}</td>
											<td className="qtd"><input type="number" className="quantity" value={detail.quantity}/></td>
											<td>{detail.price * detail.quantity}</td>
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