import React from 'react';
import SetHomeBtn from '../SetHomeBtn';
import SelectCity from '../../main/SelectCity';

const RecommendedOuterwear = ({ widgetId }) => (
	<div>
		<SelectCity place={{ city: 'Philadelphia', state: 'PA' }} />
		<SetHomeBtn widgetId={widgetId} />
	</div>
);

export default RecommendedOuterwear;
