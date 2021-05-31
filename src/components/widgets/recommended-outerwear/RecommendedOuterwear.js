import React from 'react';
import SetHomeBtn from '../SetHomeBtn';
import SelectCity from '../../main/SelectCity';

const RecommendedOuterwear = ({ widgetId }) => (
	<div>
		<SelectCity />
		<SetHomeBtn widgetId={widgetId} />
	</div>
);

export default RecommendedOuterwear;
