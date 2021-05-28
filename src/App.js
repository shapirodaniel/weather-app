import { Route } from 'react-router-dom';
import { Nav, CurrentWidget, AllWidgets } from './components';
import styled from 'styled-components';

const Layout = styled.div`
	display: grid;
	grid-template-rows: 2em 1fr;
	height: 100vh;
	width: 100vw;
`;

function App() {
	return (
		<Route path='/weather-app'>
			<Layout>
				<Nav />
				{/* to avoid a chrome error with pushing history onto localhost, we're using a temporary prefix here to render our components correctly */}

				<CurrentWidget />
				<AllWidgets />
			</Layout>
		</Route>
	);
}

export default App;
