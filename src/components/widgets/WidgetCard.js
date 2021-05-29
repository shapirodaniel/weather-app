import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Container = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	height: 48px;
	width: 48px;
	border-radius: 5px;
	color: white;
	padding: 1em;

	// purple-teal gradient to back widget icons
	background-color: #1fd1f9;
	background-image: linear-gradient(315deg, #1fd1f9 0%, #b621fe 74%);
`;

const WidgetCard = ({ icon }) => (
	<Container>
		<FontAwesomeIcon style={{ fontSize: '48px' }} icon={icon} />
	</Container>
);

export default WidgetCard;
