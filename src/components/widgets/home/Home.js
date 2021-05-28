import React, { useContext } from 'react';
import styled from 'styled-components';
import { StateContext } from '../../../contexts/stateContext';
import FCToggle from './FCToggle';
import SetHomeBtn from '../SetHomeBtn';

const Background = styled.div`
	background-image: ${props =>
		`url(https://source.unsplash.com/random/1200x800?${props.weatherString})`};
	background-repeat: no-repeat;
	object-fit: contain;
	opacity: 0.8;
	mask-image: linear-gradient(rgba(0, 0, 0, 1), transparent);
`;

const Temperature = styled.div`
	font-size: 48px;
`;

const Home = ({ widgetId }) => {
	const { state } = useContext(StateContext);

	return (
		<Background>
			<Temperature>{}</Temperature>
			<FCToggle />
			{/* SetHomeBtn expects a widgetId prop */}
			<SetHomeBtn widgetId={widgetId} />
		</Background>
	);
};

export default Home;
