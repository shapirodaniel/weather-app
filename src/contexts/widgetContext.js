import React from 'react';
import { useHomeWidget } from '../custom-hooks/useHomeWidget';

export const WidgetContext = React.createContext();

const WidgetProvider = ({ children }) => {
	const [id, setId] = useHomeWidget();

	const providerValue = { id, setId };

	return (
		<WidgetContext.Provider value={providerValue}>
			{children}
		</WidgetContext.Provider>
	);
};

export default WidgetProvider;
