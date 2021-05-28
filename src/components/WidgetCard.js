import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	height: 60px;
	width: 60px;
	border-radius: 5px;
	border: transparent;
	background-color: orange;
	color: white;
	padding: 1em;
`;

const Text = styled.span`
	font-size: 16px;
`;

const WidgetCard = ({ msg }) => (
	<Container>
		<Text>{msg}</Text>
	</Container>
);

export default WidgetCard;
