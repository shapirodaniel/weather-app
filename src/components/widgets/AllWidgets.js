/* eslint-disable react/display-name */
import React, { useContext } from 'react';
import { WidgetContext } from '../../contexts/widgetContext';
import { useRouteMatch, NavLink } from 'react-router-dom';
import { widgets } from '../widgets';
import styled from 'styled-components';

const Container = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	width: 84%;
	margin: 0 auto;
	transition: border-bottom 0.1s ease;
`;

const StyledNavLink = styled(NavLink).attrs({ activeClassName: 'selected' })`
	&.selected {
		margin-top: calc(1em - 4px);
		padding-bottom: 0.5em;
		border-bottom: 4px solid var(--purpleAccent);
	}
`;

const AllWidgets = () => {
	// url used to prefix subroutes
	const { url } = useRouteMatch();

	// our user-specified widgetId from localStorage (default is {id: 1})
	const { id } = useContext(WidgetContext);

	// we'll pull our user-specified home widget out to the front of our widgets array so that it renders first in the list
	const sortedWidgets = id
		? [widgets.find(w => w.id === +id), ...widgets.filter(w => w.id !== +id)]
		: widgets;

	return (
		<Container>
			{
				// renderCard is a function: () => <Component/>
				// to render it with our styled nav link css, we'll invoke it here, rather than declare it inline
				// this allows us to map a widgets array and provide renderCard, renderComponent functions for different use cases in the same app
				sortedWidgets.map(({ id, link, renderCard }) => {
					return (
						<StyledNavLink key={id} to={url + link}>
							{renderCard()}
						</StyledNavLink>
					);
				})
			}
		</Container>
	);
};

export default AllWidgets;
