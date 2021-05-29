/* eslint-disable react/display-name */
import React from 'react';
import { useRouteMatch, Switch, Route } from 'react-router-dom';
import { widgets } from '../widgets';

const CurrentWidget = () => {
	// url used to prefix subroutes
	const { url } = useRouteMatch();

	return (
		<Switch>
			{widgets.map(({ id, link, renderComponent }) => (
				// widget instances are { id, name, link, render: () => <Component /> }
				<Route key={id} path={url + link} render={renderComponent} />
			))}
		</Switch>
	);
};

export default CurrentWidget;
