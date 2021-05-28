import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
	display: flex;
	align-items: center;
	justify-content: flex-end;
	height: 100%;
	width: 100%;
`;

const IconContainer = styled.i`
	display: flex;
	align-items: center;
	justify-content: center;
	padding: 0.3em;
`;

const Hamburger = () => (
	<Container>
		<IconContainer>
			<i className='material-icons'>menu</i>
		</IconContainer>
	</Container>
);

export default Hamburger;
