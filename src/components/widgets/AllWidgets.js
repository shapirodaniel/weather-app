/* eslint-disable react/display-name */
import React, { useContext } from 'react';
import { useRouteMatch, NavLink } from 'react-router-dom';
import styled from 'styled-components';
import { widgets } from '../widgets';
import { WidgetContext } from '../../contexts/widgetContext';

const Container = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	width: 84%;
	margin: 0 auto;
`;

const StyledNavLink = styled(NavLink).attrs({ activeClassName: 'selected' })`
	&.selected {
		margin-top: calc(1em - 4px);
		padding-bottom: 0.5em;
		border-bottom: 4px solid var(--purpleAccent);
	}
`;

const AllWidgets = () => {
	// general purpose url for prefixing subroutes
	const { url } = useRouteMatch();

	// our user-specified widgetId
	const { id } = useContext(WidgetContext);

	// we'll pull our user-specified home widget out to the front of our widgets array so that it renders first in the list
	const sortedWidgets = id
		? [widgets.find(w => w.id === +id), ...widgets.filter(w => w.id !== +id)]
		: widgets;

	return (
		<Container>
			{sortedWidgets.map(({ id, link, renderCard }) => {
				return (
					// nav link can take a component prop that'll render whatever component we pass
					// as long as its an anonymous fn, ex () => <Component/>
					<StyledNavLink key={id} to={url + link} component={renderCard} />
				);
			})}
		</Container>
	);
};

export default AllWidgets;
