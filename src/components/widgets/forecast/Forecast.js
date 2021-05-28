import React, { useContext } from 'react';
import { WidgetContext } from '../../../contexts/widgetContext';

const Forecast = ({ widgetId }) => {
	const { setId } = useContext(WidgetContext);

	return (
		<section>
			<div>forecast time!</div>
			<button onClick={() => setId(String(widgetId))}>set home</button>
		</section>
	);
};

export default Forecast;
