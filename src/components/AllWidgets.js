/* eslint-disable react/display-name */
import React from 'react';
import { useRouteMatch, NavLink } from 'react-router-dom';
import styled from 'styled-components';
import { widgets } from './widgets';

const Container = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 1em;
`;

// active class styling for NavLink applied by styled-components
const StyledNavLink = styled(NavLink).attrs({ activeClassName: 'selected' })`
	&.selected {
		margin-top: calc(0.5em + 4px);
		padding-bottom: 0.5em;
		border-bottom: 4px solid orange;
	}
`;

const AllWidgets = () => {
	// general purpose url for prefixing subroutes
	const { url } = useRouteMatch();

	return (
		<Container>
			{widgets.map(({ id, link, renderCard }) => {
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
