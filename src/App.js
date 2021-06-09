import React, { useContext } from 'react';
import { WeatherContext } from './contexts/weatherContext';
import styled from 'styled-components';
import Nav from './components/Nav';
import Home from './components/Home';
import Loading from './components/Loading';

const Container = styled.div`
	height: 100vh;
	width: 100vw;
	max-width: 400px;
	max-height: 800px;
`;

const App = () => {
	const { weatherLoading, weatherError } = useContext(WeatherContext);

	if (weatherLoading || weatherError) {
		return <Loading />;
	}

	return (
		<Container>
			<Nav />
			<Home />
		</Container>
	);
};

export default App;
