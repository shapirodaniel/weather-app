import { WidgetCard, Home, RecommendedOuterwear, Forecast } from './widgets/';
import {
	faCloudMeatball,
	faTshirt,
	faCalendarAlt,
} from '@fortawesome/free-solid-svg-icons';

export const widgets = [
	{
		id: 1,
		link: '/home',
		renderCard: () => <WidgetCard icon={faCloudMeatball} />,
		renderComponent: () => <Home widgetId={1} />,
	},
	{
		id: 2,
		link: '/outerwear',
		renderCard: () => <WidgetCard icon={faTshirt} />,
		renderComponent: () => <RecommendedOuterwear widgetId={2} />,
	},
	{
		id: 3,
		link: '/forecast',
		renderCard: () => <WidgetCard icon={faCalendarAlt} />,
		renderComponent: () => <Forecast widgetId={3} />,
	},
];
