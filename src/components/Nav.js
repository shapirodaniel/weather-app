import React, { useContext } from 'react';
import styled from 'styled-components';
import { ThemeContext } from '../contexts/themeContext';

const Container = styled.div`
	display: flex;
	align-items: center;
	justify-content: flex-end;
	height: 100%;
	width: 100%;
	color: orange;
`;

const IconContainer = styled.i`
	display: flex;
	align-items: center;
	justify-content: center;
	padding: 0.3em;
	transform: ${props => (props.isDarkMode ? 'rotate(180deg)' : 'none')};
`;

const Nav = () => {
	const { isDarkMode, setDarkMode } = useContext(ThemeContext);

	return (
		<Container>
			<IconContainer
				isDarkMode={isDarkMode}
				onClick={() => setDarkMode(!isDarkMode)}
			>
				<i className='material-icons'>brightness_4</i>
			</IconContainer>
			<IconContainer>
				<i className='material-icons'>menu</i>
			</IconContainer>
		</Container>
	);
};

export default Nav;
