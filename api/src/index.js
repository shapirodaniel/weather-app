import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import WeatherProvider from './contexts/weatherContext';

ReactDOM.render(
	<React.StrictMode>
		<WeatherProvider>
			<App />
		</WeatherProvider>
	</React.StrictMode>,
	document.getElementById('root')
);
