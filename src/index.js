import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom';
import history from './history';
import StateProvider from './contexts/stateContext';
import ThemeProvider from './contexts/themeContext';
import WidgetProvider from './contexts/widgetContext';

ReactDOM.render(
	<React.StrictMode>
		<ThemeProvider>
			<WidgetProvider>
				<StateProvider>
					<Router history={history}>
						<App />
					</Router>
				</StateProvider>
			</WidgetProvider>
		</ThemeProvider>
	</React.StrictMode>,
	document.getElementById('root')
);
