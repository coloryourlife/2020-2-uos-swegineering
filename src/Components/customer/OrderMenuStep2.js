import React from 'react';

export const OrderMenuStep2 = ({ menu, handleMenu, currentStep, menuList}) => {
	if(currentStep !== 2) return null;

	const noEnter = (e) => {
		if(e.keyCode === 13) e.preventDefault();
	}
	console.log(menu)
	return(
		<>
			<div className="row orderMenuStep1">
				<h5 className="left col s10 offset-s1">스타일 선택</h5>
				{menuList.map((menus) => {
					return(
						<div className="col s4" key={menus.name}>
							<div className="card darken-1" >
								<div className="card-content">
									<span className="card-title">{menus.name}</span>
									<div className="menuContent">{menus.content}</div>
								</div>
								<div className="card-action">
									<div className="waves-effect waves-light btn" onClick = {handleMenu} id={menus.name}>선택하기</div>
								</div>
							</div>
						</div>
					)
				})}
			</div>
		</>
	)
}