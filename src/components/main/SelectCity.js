import React, { useState, useRef, useEffect, useContext } from 'react';
import { WeatherContext } from '../../contexts/weatherContext';
import { useSuggestions } from '../../custom-hooks/useSuggestions';
import styled from 'styled-components';

const Container = styled.div``;

const CityName = styled.div``;

const SelectCity = place => {
	// first we'll grab our cityName from Weather Context to initialize local state
	const { cityName, updateCity } = useContext(WeatherContext);

	// * note * useState does not automatically merge prev, current states like this.setState in a class component
	// if we wanted to use a single state object we'd need to do something like this:
	// setState(prevState => ({...prevState, ...updatedValues}))
	// https://reactjs.org/docs/hooks-reference.html#usestate
	const [userInput, setUserInput] = useState('');
	const [places, setPlaces] = useState([]);
	const [selected, setSelected] = useState(place);
	const [activeInput, setActiveInput] = useState(false);

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
		<div style={{ display: 'flex', flexDirection: 'column ' }}>
			{!activeInput ? (
				<div
					onClick={() => setActiveInput(true)}
					onBlur={() => setActiveInput(false)}
				>
					{cityName}
				</div>
			) : (
				<div>
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
									setSelected({ city, state });
									setUserInput('');
									setPlaces([]);
									setActiveInput(false);
									updateCity(city);
								}}
							>{`${city}, ${state}, US`}</div>
						))}
					</div>
				</div>
			)}
		</div>
	);
};

export default SelectCity;
