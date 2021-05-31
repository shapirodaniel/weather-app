import React, { useState, useRef, useEffect } from 'react';
import { useSuggestions } from '../../custom-hooks/useSuggestions';

const SelectCity = () => {
	const [userInput, setUserInput] = useState('');
	const [places, setPlaces] = useState([]);
	const [selected, setSelected] = useState('');

	const { suggestions, loading, error } = useSuggestions(userInput);

	const textFieldRef = useRef(null);

	useEffect(() => {
		if (textFieldRef.current.id === document.activeElement.id) {
			setPlaces(suggestions || []);
		}
	}, [userInput, suggestions]);

	return (
		<div style={{ display: 'flex', flexDirection: 'column ' }}>
			<div>City name is: {selected}</div>
			<input
				type='text'
				id='cityNameInput'
				defaultValue={userInput}
				ref={textFieldRef}
				onChange={e => setUserInput(e.target.value)}
			/>
			<select
				onChange={e => setSelected(e.target.value)}
				defaultValue={'Please select a city'}
			>
				{places.map(({ city, state }, idx) => (
					<option key={idx}>{`${city}, ${state}, US`}</option>
				))}
			</select>
		</div>
	);
};

export default SelectCity;
