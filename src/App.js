import { Route, Redirect } from 'react-router-dom';
import { Nav, NotFound } from './components/main';
import { CurrentWidget, AllWidgets } from './components/widgets/';
import styled from 'styled-components';

const Container = styled.div`
	height: 100vh;
	width: 100vw;
`;

const Main = () => (
	<Container>
		<Nav />
		<CurrentWidget />
		<AllWidgets />
	</Container>
);

const App = () => (
	// to avoid a chrome security restriction with pushing history onto localhost, we're using a redirect to a temporary prefix here to send our user directly to their home widget at /weather-app/home
	<div>
		<Redirect to='/weather-app/home' />
		<Route path='/weather-app' component={Main} />
		<Route path='/404' component={NotFound} />
	</div>
);

export default App;
