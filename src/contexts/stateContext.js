import React, { useReducer } from 'react';

export const StateContext = React.createContext();

// action types
const SET_TEMP_TYPE = 'SET_TEMP_TYPE';

// initState
const initState = {
	tempType: 'fahrenheit',
};

const reducer = (state, { type, payload }) => {
	switch (type) {
		case SET_TEMP_TYPE: {
			return { ...state, tempType: payload };
		}
		default:
			return state;
	}
};

const StateProvider = ({ children }) => {
	const [state, dispatch] = useReducer(reducer, initState);

	const providerValue = {
		state,
		dispatch,
	};

	return (
		<StateContext.Provider value={providerValue}>
			{children}
		</StateContext.Provider>
	);
};

export default StateProvider;
