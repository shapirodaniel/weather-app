import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
	position: absolute;
	top: 0;
	left: 0;
	height: 100vh;
	width: 100vw;

	display: flex;
	align-items: center;
	justify-content: center;

	background-color: black;
`;

const Spinner = styled.span`
	padding: 4em;
	background-color: white;
	color: black;
`;

const Loading = () => (
	<Container>
		<Spinner>Loading ...</Spinner>
	</Container>
);

export default Loading;
