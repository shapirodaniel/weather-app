import React, { useContext } from 'react';
import { WidgetContext } from '../../contexts/widgetContext';
import styled from 'styled-components';

const Button = styled.span`
	display: flex;
	align-items: flex-end;
	justify-content: center;
	color: white;
	font-size: 16px;
	flex-grow: 0.5;
`;

const SetHomeBtn = ({ widgetId }) => {
	const { setId } = useContext(WidgetContext);

	return (
		<Button
			onClick={() => {
				setId(String(widgetId));
			}}
		>
			set home widget
		</Button>
	);
};

export default SetHomeBtn;
