import React, { useState } from 'react';
import styled from 'styled-components';

const Container = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	width: 80px;
	margin: 0 auto;

	// temp
	margin-top: 300px;
	z-index: 20;
`;

const Button = styled.div`
	padding: 1em;
	border: 1px solid lightgrey;
	color: ${({ active }) => (active === 'true' ? 'red' : 'inherit')};
	background-color: ${({ active }) =>
		active === 'true' ? 'lightgrey' : 'inherit'};
	cursor: pointer;
`;

const FCToggle = () => {
	const [tempType, setTempType] = useState('fahrenheit');

	return (
		<Container>
			<Button
				active={(tempType === 'fahrenheit').toString()}
				onClick={() => {
					console.log('temp type is: ', 'fahrenheit');
					setTempType('fahrenheit');
				}}
			>
				F
			</Button>
			<Button
				active={(tempType === 'celsius').toString()}
				onClick={() => {
					console.log('temp type is: ', 'celsius');
					setTempType('celsius');
				}}
			>
				C
			</Button>
		</Container>
	);
};

export default FCToggle;
