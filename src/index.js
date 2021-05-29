import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom';
import history from './history';
import WeatherProvider from './contexts/weatherContext';
import WidgetProvider from './contexts/widgetContext';

ReactDOM.render(
	<React.StrictMode>
		<WeatherProvider>
			<WidgetProvider>
				<Router history={history}>
					<App />
				</Router>
			</WidgetProvider>
		</WeatherProvider>
	</React.StrictMode>,
	document.getElementById('root')
);
