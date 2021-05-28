import React from 'react';
import SetHomeBtn from '../SetHomeBtn';

const Forecast = ({ widgetId }) => {
	return (
		<section>
			<div>forecast time!</div>
			<SetHomeBtn widgetId={widgetId} />
		</section>
	);
};

export default Forecast;
