import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import { ThemeContext } from '../contexts/themeContext';
import { Menu } from './';

const Container = styled.div`
	display: flex;
	align-items: center;
	justify-content: flex-end;
	height: 100%;
	width: 100%;
	color: ${({ isDarkMode }) => (isDarkMode ? 'black' : 'orange')};

	// we'll use position relative to absolute-position our dropdown menu
	position: relative;
`;

const IconContainer = styled.span`
	// "&" lets us reference the current element
	// and apply selectors as necessary
	& {
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 0.3em;
		transform: ${({ isDarkMode }) => (isDarkMode ? 'rotate(180deg)' : 'none')};
	}
	// here, we assign icon descendants a "click" cursor
	& i {
		cursor: pointer;
	}
`;

const Nav = () => {
	const { isDarkMode, setDarkMode } = useContext(ThemeContext);

	const [isVisible, setVisible] = useState(false);

	return (
		<Container isDarkMode={isDarkMode}>
			<IconContainer
				isDarkMode={isDarkMode}
				onClick={() => setDarkMode(!isDarkMode)}
			>
				<i className='material-icons'>brightness_4</i>
			</IconContainer>
			<IconContainer onClick={() => setVisible(!isVisible)}>
				<i className='material-icons'>{isVisible ? 'menu_open' : 'menu'}</i>
			</IconContainer>
			<Menu isVisible={isVisible} />
		</Container>
	);
};

export default Nav;
