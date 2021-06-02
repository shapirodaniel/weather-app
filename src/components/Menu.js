import React, { useContext } from 'react';
import styled from 'styled-components';
import { WeatherContext } from '../contexts/weatherContext';
import SelectCity from './SelectCity';
import FCToggle from './FCToggle';

const Container = styled.div`
	& {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		justify-content: flex-start;

		position: absolute;
		top: 3em;
		right: 0;
		// calc lets us account for the absolute offset without overflowing the page
		height: calc(100vh - 3em);
		width: 0;
		z-index: 10;
		background-color: white;
		display: flex;
		align-items: flex-start;
		// animate menu entering/exiting screen
		transition-property: width;
		transition-duration: 0.3s;
		transition-timing-function: cubic-bezier(0, 1, 0.5, 1);
	}
	&.active {
		// menu is now visible
		width: 80%;
	}
`;

const Section = styled.section`
	display: ${({ isVisible }) => (isVisible ? 'flex' : 'none')};
	flex-direction: column;
	align-items: flex-start;
	justify-content: flex-start;
	width: 100%;
	height: min-content;
	padding: 1em;
`;

const Label = styled.div`
	padding: 1em 0;
	color: black;
`;

const Menu = ({ isVisible }) => {
	const { imperialOrMetric } = useContext(WeatherContext);

	return (
		<Container className={isVisible ? 'active' : ''}>
			<Section isVisible={isVisible}>
				<Label>Weather</Label>
				<FCToggle currentType={imperialOrMetric} />
			</Section>

			<Section isVisible={isVisible}>
				<SelectCity />
			</Section>
		</Container>
	);
};

export default Menu;
