import React from 'react';

export const OrderMenuStep1 = ({ handleMenu, currentStep, menuList, handleChange}) => {
	if(currentStep !== 1) return null;
	if(menuList.length === 0) return <div>로그인해주세요</div>
	return(
		<>
			<div className="row orderMenuStep1">
				<h4 className="left col s10 offset-s1">디너 메뉴</h4>
				<h5 className="left col s10 offset-s1">메뉴는 한 가지로 통일해주셔야 합니다.</h5>
				{menuList.map((menus) => {
					return(
						<div className="col s4" key={menus.name}>
							<div className="card darken-1" >
								<div className="card-content">
									<span className="card-title">{menus.name}</span>
									<div className="menuContent">{menus.content}</div>
									<div className="price">{menus.price} 원 / 인</div>
									<input type="number" className="menuQuantity" value={menus.quantity} id={menus.name} onChange={handleChange} min="0" required/>
								</div>
								<div className="card-action">
									<button className="waves-effect waves-light btn" onClick = {handleMenu} id={menus.name} value={menus.quantity}>선택하기</button>
								</div>
							</div>
						</div>
					)
				})}
			</div>
		</>
	)
}