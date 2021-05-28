import { Route } from 'react-router-dom';
import { Nav, CurrentWidget, AllWidgets } from './components';
import './App.css';

function App() {
	return (
		<div>
			<Nav />
			{/* to avoid a chrome error with pushing history onto localhost,
			we're using a temporary prefix here to render our components correctly */}
			<Route path='/weather-app'>
				<CurrentWidget />
				<AllWidgets />
			</Route>
		</div>
	);
}

export default App;
