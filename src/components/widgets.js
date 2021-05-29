import { WidgetCard, Home, RecommendedOuterwear, Forecast } from './widgets/';
import {
	faHome,
	faTshirt,
	faCalendarAlt,
} from '@fortawesome/free-solid-svg-icons';

export const widgets = [
	{
		id: 1,
		link: '/home',
		renderCard: () => <WidgetCard icon={faHome} />,
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
