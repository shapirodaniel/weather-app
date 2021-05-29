import React, { useContext } from 'react';
import { WidgetContext } from '../../contexts/widgetContext';
import styled from 'styled-components';

const Button = styled.span`
	& {
		display: flex;
		align-items: flex-end;
		justify-content: center;
		color: white;
		font-size: 16px;
		margin-top: 4em;
		padding: 0.5em 1em;
		border-radius: 5px;
		background-color: var(--lightAccent);
		box-shadow: 2px 2px 0 white;
	}
	// gives button click effect
	&:active {
		transform: translate(2px, 2px);
		box-shadow: none;
	}
`;

const SetHomeBtn = ({ widgetId }) => {
	const { setId } = useContext(WidgetContext);

	return (
		<Button onClick={() => setId(String(widgetId))}>set home widget</Button>
	);
};

export default SetHomeBtn;
