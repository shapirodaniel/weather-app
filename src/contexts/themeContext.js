import React, { useState } from 'react';

export const ThemeContext = React.createContext();

const ThemeProvider = ({ children }) => {
	const [isDarkMode, setDarkMode] = useState(false);

	const providerValue = {
		isDarkMode,
		setDarkMode,
	};

	return (
		<ThemeContext.Provider value={providerValue}>
			{children}
		</ThemeContext.Provider>
	);
};

export default ThemeProvider;
