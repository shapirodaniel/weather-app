import React, { useContext } from 'react';
import { WidgetContext } from '../contexts/widgetContext';

const Home = ({ widgetId }) => {
	const { setId } = useContext(WidgetContext);

	return (
		<section>
			<div>weather time!</div>
			<button onClick={() => setId(String(widgetId))}>set home</button>
		</section>
	);
};

export default Home;
