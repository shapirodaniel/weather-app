import React, { useState, useRef, useEffect, useContext } from 'react';
import { WeatherContext } from '../contexts/weatherContext';
import { useSuggestions } from '../custom-hooks/useSuggestions';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

const Container = styled.div`
	display: flex;
	flex-direction: column;
	color: black;
`;

const Label = styled.div`
	padding: 1em 0;
`;

const MagnifyingGlass = styled.span`
	display: flex;
	align-items: center;
	justify-content: center;
	font-size: 22px;
	margin-right: 0.5em;
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
	const { cityName, updateCity } = useContext(WeatherContext);
	const [userInput, setUserInput] = useState('');
	const [places, setPlaces] = useState([]);
	const { suggestions } = useSuggestions(userInput);
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
					<MagnifyingGlass>
						<FontAwesomeIcon icon={faSearch} />
					</MagnifyingGlass>
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
								textFieldRef.current.value = `${city}, ${state}, US`;
							}}
						>{`${city}, ${state}, US`}</Suggestion>
					))}
				</div>
			</section>
		</Container>
	);
};

export default SelectCity;
