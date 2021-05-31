import React from 'react';
import styled from 'styled-components';
import SelectCity from './SelectCity';

const Container = styled.div`
	& {
		position: absolute;
		top: 3em;
		right: 0;
		// calc lets us account for the absolute offset without overflowing the page
		height: calc(100vh - 3em);
		width: 0;
		z-index: 10;
		background-color: white;
		display: flex;
		align-items: center;
		justify-content: center;
		// animate menu entering/exiting screen
		transition-property: width;
		transition-duration: 0.3s;
		transition-timing-function: cubic-bezier(0, 1, 0.5, 1);
	}
	&.active {
		// menu is now visible
		width: 80%;
	}
`;

const Menu = ({ isVisible }) => (
	<Container className={isVisible ? 'active' : ''}>
		<SelectCity isVisible={isVisible} />
	</Container>
);

export default Menu;
