import { Route } from 'react-router-dom';
import { Nav, NotFound } from './components/main';
import { CurrentWidget, AllWidgets } from './components/widgets/';
import styled from 'styled-components';

const Layout = styled.div`
	display: grid;
	grid-template-rows: 3em 1fr;
	height: 100vh;
	width: 100vw;
`;

function App() {
	return (
		// to avoid a chrome error with pushing history onto localhost,
		// we're using a temporary prefix here to render our components correctly
		<div>
			<Route path='/weather-app'>
				<Layout>
					<Nav />
					<CurrentWidget />
					<AllWidgets />
				</Layout>
			</Route>
			<Route path='/404' component={NotFound} />
		</div>
	);
}

export default App;
