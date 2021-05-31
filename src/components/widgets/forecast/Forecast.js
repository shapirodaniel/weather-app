import React from 'react';
import SwipeCarousel from '../../main/SwipeCarousel';
import SetHomeBtn from '../SetHomeBtn';

const slideArray = [
	{
		renderComponent: () => <div>hi im component 1</div>,
	},
	{
		renderComponent: () => <div>hi im component 2</div>,
	},
	{
		renderComponent: () => <div>hi im component 3</div>,
	},
];

const Forecast = ({ widgetId }) => {
	return (
		<section style={{ backgroundColor: 'black', color: 'orange' }}>
			<SwipeCarousel slideArray={slideArray} />
			<SetHomeBtn widgetId={widgetId} />
		</section>
	);
};

export default Forecast;
