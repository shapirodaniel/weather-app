import React, { useContext } from 'react';
import styled from 'styled-components';
import { StateContext } from '../../../contexts/stateContext';

const Container = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	width: 80px;
	margin: 0 auto;
`;

const Button = styled.div`
	& {
		padding: 1em;
		border: 1px solid white;
		color: ${({ active }) =>
			active === 'true' ? 'inherit' : 'var(--lightAccent)'};
		background-color: ${({ active }) =>
			active === 'true' ? 'ghostwhite' : 'inherit'};
		cursor: pointer;
		font-size: 16px;
	}

	&:first-child {
		border-top-left-radius: 5px;
		border-bottom-left-radius: 5px;
	}

	&:last-child {
		border-top-right-radius: 5px;
		border-bottom-right-radius: 5px;
	}
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
