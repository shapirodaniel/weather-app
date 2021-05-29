import { WidgetCard, Home, RecommendedOuterwear, Forecast } from './widgets/';

export const widgets = [
	{
		id: 1,
		link: '/home',
		renderCard: () => <WidgetCard src={'/assets/home.png'} />,
		renderComponent: () => <Home widgetId={1} />,
	},
	{
		id: 2,
		link: '/outerwear',
		renderCard: () => <WidgetCard src={'/assets/recommended-outerwear.png'} />,
		renderComponent: () => <RecommendedOuterwear widgetId={2} />,
	},
	{
		id: 3,
		link: '/forecast',
		renderCard: () => <WidgetCard src={'/assets/forecast.png'} />,
		renderComponent: () => <Forecast widgetId={3} />,
	},
];
