import React, { useState } from 'react';
import styled from 'styled-components';
import { Menu } from './';

const Container = styled.div`
	display: flex;
	align-items: center;
	justify-content: flex-end;
	height: 3em;
	width: 100%;
	background-color: rgba(0, 0, 0, 0.4);
	color: ghostwhite;
	// position relative on the parent allows us to create a floating dropdown menu
	position: relative;
`;

const IconContainer = styled.span`
	padding: 0.6em;
	cursor: pointer;
`;

const Nav = () => {
	// manage state of icon and menu visibilitys
	const [isVisible, setVisible] = useState(false);

	return (
		<Container>
			<IconContainer onClick={() => setVisible(!isVisible)}>
				<i style={{ fontSize: '36px' }} className='material-icons'>
					{isVisible ? 'menu_open' : 'menu'}
				</i>
			</IconContainer>
			<Menu isVisible={isVisible} />
		</Container>
	);
};

export default Nav;
