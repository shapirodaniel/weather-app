import React, { useContext } from 'react';
import styled from 'styled-components';
import { StateContext } from '../../../contexts/stateContext';

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
	const { state, actionsLib, dispatch } = useContext(StateContext);
	const { tempType } = state;
	const { SET_TEMP_TYPE } = actionsLib;

	return (
		<Container>
			<Button
				active={(tempType === 'fahrenheit').toString()}
				onClick={() => {
					dispatch({ type: SET_TEMP_TYPE, payload: 'fahrenheit' });
				}}
			>
				F
			</Button>
			<Button
				active={(tempType === 'celsius').toString()}
				onClick={() => {
					dispatch({ type: SET_TEMP_TYPE, payload: 'celsius' });
				}}
			>
				C
			</Button>
		</Container>
	);
};

export default FCToggle;
