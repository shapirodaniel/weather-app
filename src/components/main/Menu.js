import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
	position: absolute;
	top: 2.7em;
	right: 0.5em;
	height: min-content;
	min-height: 500px;
	width: 300px;
	background-color: white;
	z-index: 10;
`;

const Menu = ({ isVisible }) => {
	return isVisible ? <Container>hi im menu</Container> : null;
};

export default Menu;
