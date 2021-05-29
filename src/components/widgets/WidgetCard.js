import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	height: 60px;
	width: 60px;
	border-radius: 5px;
	border: 1px solid var(--lightAccent);
	color: white;
	padding: 1em;
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
