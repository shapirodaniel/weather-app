import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom';
import history from './history';
import ThemeProvider from './contexts/themeContext';
import WidgetProvider from './contexts/widgetContext';

ReactDOM.render(
	<React.StrictMode>
		<ThemeProvider>
			<WidgetProvider>
				<Router history={history}>
					<App />
				</Router>
			</WidgetProvider>
		</ThemeProvider>
	</React.StrictMode>,
	document.getElementById('root')
);
