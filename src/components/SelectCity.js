import React, { useState, useRef, useEffect, useContext } from 'react';
import { WeatherContext } from '../contexts/weatherContext';
import { useSuggestions } from '../custom-hooks/useSuggestions';
import styled from 'styled-components';

const Container = styled.div`
	display: ${props => (props.isVisible ? 'flex' : 'none')};
	flex-direction: column;
`;

const CityName = styled.div``;

const SelectCity = ({ isVisible }) => {
	// first we'll grab our cityName from Weather Context to initialize local state
	const { cityName, updateCity } = useContext(WeatherContext);

	// * note * useState does not automatically merge prev, current states like this.setState in a class component
	// if we wanted to use a single state object we'd need to do something like this:
	// setState(prevState => ({...prevState, ...updatedValues}))
	// https://reactjs.org/docs/hooks-reference.html#usestate
	const [userInput, setUserInput] = useState('');
	const [places, setPlaces] = useState([]);

	const { suggestions, loading, error } = useSuggestions(userInput);

	const textFieldRef = useRef(null);

	useEffect(() => {
		if (
			textFieldRef.current &&
			textFieldRef.current.id === document.activeElement.id
		) {
			setPlaces(suggestions || []);
		}
	}, [userInput, suggestions]);

	return (
		<Container isVisible={isVisible}>
			<section>
				<input
					type='text'
					id='cityNameInput'
					ref={textFieldRef}
					defaultValue={cityName}
					onChange={e => setUserInput(e.target.value)}
				/>
				<div>
					{places.map(({ city, state }, idx) => (
						<div
							key={idx}
							onClick={() => {
								setUserInput('');
								setPlaces([]);
								updateCity(city);
							}}
						>{`${city}, ${state}, US`}</div>
					))}
				</div>
			</section>
		</Container>
	);
};

export default SelectCity;
