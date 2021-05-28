import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Router } from 'react-router-dom';
import history from './history';
import WidgetProvider from './contexts/widgetContext';

ReactDOM.render(
	<React.StrictMode>
		<WidgetProvider>
			<Router history={history}>
				<App />
			</Router>
		</WidgetProvider>
	</React.StrictMode>,
	document.getElementById('root')
);
