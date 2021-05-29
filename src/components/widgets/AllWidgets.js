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
	position: fixed;
	bottom: 0;
	overflow-x: auto;
`;

// active class styling for NavLink applied by styled-components
const StyledNavLink = styled(NavLink).attrs({ activeClassName: 'selected' })`
	// "&" lets us reference the element with selectors as necessary
	& {
		margin: 1em;
	}
	&.selected {
		margin: calc(2em - 4px) 1em 1em 1em;
		padding-bottom: 0.5em;
		border-bottom: 4px solid var(--lightAccent);
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
					<StyledNavLink key={id} to={url + link}>
						{renderCard()}
					</StyledNavLink>
				);
			})}
		</Container>
	);
};

export default AllWidgets;
