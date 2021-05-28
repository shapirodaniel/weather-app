/* eslint-disable react/display-name */
import React from 'react';
import { useRouteMatch, Switch, Route } from 'react-router-dom';
import { widgets } from './widgets';

const CurrentWidget = () => {
	// general purpose url for prefixing subroutes
	const { url } = useRouteMatch();

	console.log(url);

	return (
		<Switch>
			{widgets.map(({ id, link, renderComponent }) => (
				// widget instances are { id, name, link, render: Function }
				<Route key={id} path={url + link} render={renderComponent} />
			))}
		</Switch>
	);
};

export default CurrentWidget;
