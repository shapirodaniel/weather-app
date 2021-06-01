import React, { useState, useRef, useEffect, useContext } from 'react';
import { WeatherContext } from '../contexts/weatherContext';
import { useSuggestions } from '../custom-hooks/useSuggestions';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

const Container = styled.div`
	display: ${props => (props.isVisible ? 'flex' : 'none')};
	flex-direction: column;
	color: black;
`;

const Label = styled.div`
	padding: 0.5em;
`;

const Hourglass = styled.span`
	display: flex;
	align-items: center;
	justify-content: center;
	font-size: 22px;
	padding: 0.3em;
`;

const Input = styled.input`
	border: transparent;
	border-bottom: 2px solid black;
	padding-bottom: 0.3em;
	width: 100%;
	font-size: 24px;
	// removes outline on focus
	outline: none;
`;

const Suggestion = styled.div`
	& {
		margin: 2em;
		margin-left: 2.2em;
		border-bottom: 1px solid lightgrey;
		padding-bottom: 0.5em;
		width: 88%;
		cursor: pointer;
	}
	&:hover::before {
		content: '▸';
		padding-right: 0.3em;
	}
`;

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
				<Label>Choose a city</Label>
				<div style={{ display: 'flex', width: '100%' }}>
					<Hourglass>
						<FontAwesomeIcon icon={faSearch} />
					</Hourglass>
					<Input
						type='text'
						id='cityNameInput'
						ref={textFieldRef}
						defaultValue={cityName}
						onChange={e => setUserInput(e.target.value)}
					/>
				</div>
				<div>
					{places.map(({ city, state }, idx) => (
						<Suggestion
							key={idx}
							onClick={() => {
								updateCity(city);
								setUserInput(city);
								setPlaces([]);
								textFieldRef.current.value = city;
							}}
						>{`${city}, ${state}, US`}</Suggestion>
					))}
				</div>
			</section>
		</Container>
	);
};

export default SelectCity;
