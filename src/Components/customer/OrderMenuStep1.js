import React from 'react';

export const OrderMenuStep1 = ({ menu, handleMenu, currentStep}) => {
	if(currentStep !== 1) return null;

	const noEnter = (e) => {
		if(e.keyCode === 13) e.preventDefault();
	}

	return(
		<>
			<div className="row OrderMenuStep1">
				<h5 className="left col s10 offset-s1">디너 메뉴</h5>
			</div>
		</>
	)
}