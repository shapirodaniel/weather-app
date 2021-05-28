import React, { useContext } from 'react';
import { WidgetContext } from '../../contexts/widgetContext';

const SetHomeBtn = ({ widgetId }) => {
	const { setId } = useContext(WidgetContext);

	return (
		<button
			onClick={() => {
				setId(String(widgetId));
			}}
		>
			set home
		</button>
	);
};

export default SetHomeBtn;
