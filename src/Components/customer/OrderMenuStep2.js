import React from 'react';

export const OrderMenuStep2 = ({ menu, handleStyle, currentStep, styleList}) => {
	if(currentStep !== 2) return null;

	const noEnter = (e) => {
		if(e.keyCode === 13) e.preventDefault();
	}
	if(styleList.length < 0) return <div className="container">로딩중...</div>
	return(
		<>
			<div className="row orderMenuStep1">
				<h5 className="left col s10 offset-s1">스타일 선택</h5>
				{styleList.map((styles) => {
					return(
						<div className="col s4" key={styles.name}>
							<div className="card darken-1" >
								<div className="card-content">
									<span className="card-title">{styles.name}</span>
									<div className="menuContent">{styles.content}</div>
									<div className="menuContent">{styles.price}</div>
								</div>
								<div className="card-action">
									<div className="waves-effect waves-light btn" onClick={handleStyle} id={styles.name}>선택하기</div>
								</div>
							</div>
						</div>
					)
				})}
			</div>
		</>
	) 
}