import React, { useContext } from 'react';
import { WidgetContext } from '../contexts/widgetContext';
import styled from 'styled-components';
import { FCToggle } from './';

const Background = styled.div`
	background-image: ${props =>
		`url(https://source.unsplash.com/random/1200x800?${props.weatherString})`};
	background-repeat: no-repeat;
	object-fit: contain;
	opacity: 0.8;
	mask-image: linear-gradient(rgba(0, 0, 0, 1), transparent);
`;

const SetHome = styled.span`
	color: inherit;
	opacity: 0.6;
`;

const Home = ({ widgetId }) => {
	const { setId } = useContext(WidgetContext);

	return (
		<Background>
			<FCToggle />
			<SetHome onClick={() => setId(String(widgetId))}>set home</SetHome>
		</Background>
	);
};

export default Home;
