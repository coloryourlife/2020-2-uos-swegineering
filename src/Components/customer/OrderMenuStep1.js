import React from 'react';

export const OrderMenuStep1 = ({ menu, handleMenu, currentStep, menuList}) => {
	if(currentStep !== 1) return null;

	const noEnter = (e) => {
		if(e.keyCode === 13) e.preventDefault();
	}

	return(
		<>
			<div className="row orderMenuStep1">
				<h5 className="left col s10 offset-s1">디너 메뉴</h5>
				{menuList.map((menus) => {
					let style = [];
					let styles = [];
					for(let key in menus.style){
						style.push(<p>{menus.style[key].name}</p>)
						style.push(<p>{menus.style[key].detail}</p>)
						style.push(<p>{menus.style[key].price}</p>)
						styles.push(<div className="col s4">{style}</div>)
						style = []
					}
					return(
						<div className="row" key ={menus.name}>
							<div className="col s12">
								<div className="card darken-1">
									<div className="card-content" key={menus.name}>
										<span className="card-title">{menus.name}</span>
										<div className="menuContent">{menus.content}</div>
										<div className="row">
											{styles}
										</div>
									</div>
									<div className="card-action">
										<a className="waves-effect waves-ligth btn">선택하기</a>
									</div>
								</div>
							</div>
						</div>
					)
				})}
			</div>
		</>
	)
}