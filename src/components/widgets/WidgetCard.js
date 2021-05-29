import React from 'react';
import styled from 'styled-components';

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

const Image = styled.img`
	height: 80px;
	width: 80px;
	border-radius: 5px;
	object-fit: cover;
	object-position: center;
`;

const WidgetCard = ({ src }) => (
	<Container>
		<Image src={src} alt='icon' />
	</Container>
);

export default WidgetCard;
