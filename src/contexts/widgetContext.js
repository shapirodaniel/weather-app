import React, { useState, useEffect, useRef } from 'react';

export const WidgetContext = React.createContext();

const WidgetProvider = ({ children }) => {
	// this flag lets us trigger re-renders downstream
	const [change, setChange] = useState(false);

	// we'll store our localStorage retrieved value here, initialized to 1, in case localStorage hasn't been set -- important! we'll need to persist this value across renders, so we'll store the id on our widgetRef.current
	let widgetRef = useRef({ id: localStorage.getItem('homeWidgetId') || 1 });

	// we'll then update our widgetRef.current.id every time we receive a change notification from downstream by tracking the change value in our useEffect dependency list
	useEffect(() => {
		widgetRef.current.id = localStorage.getItem('homeWidgetId') || 1;
	}, [change]);

	// this method takes in the widgetId, updates localStorage / widgetRef.current.id, and flags a change to trigger a re-render
	const setHomeWidget = newId => {
		localStorage.setItem('homeWidgetId', newId);
		widgetRef.current.id = newId;
		setChange(!change);
	};

	// we'll expose a minimal interface to other components consuming this context -- just an id and a setId function that will allow our user to specify whichever widget they choose as their "home" widget -- its WidgetCard will get special styling and sit at the top left of our AllWidgets component
	const providerValue = { id: widgetRef.current.id, setId: setHomeWidget };

	return (
		<WidgetContext.Provider value={providerValue}>
			{children}
		</WidgetContext.Provider>
	);
};

export default WidgetProvider;
