/* eslint-disable react-hooks/exhaustive-deps */
// we'll disable exhaustive deps to avoid a linter issue
// with our localStorage retrieval in useEffect

import { useState, useEffect } from 'react';

export const useHomeWidget = () => {
	const [homeWasChanged, changeHome] = useState(false);

	const setHomeWidgetId = newId => {
		localStorage.setItem('homeWidgetId', newId);
		changeHome(!homeWasChanged);
	};

	let homeWidgetId;
	useEffect(() => {
		let isMounted = true;

		if (isMounted)
			try {
				homeWidgetId = localStorage.getItem('homeWidgetId');
			} catch (err) {
				homeWidgetId = 0;
				setHomeWidgetId(homeWidgetId);
			}

		return () => {
			isMounted = false;
		};
	}, [homeWasChanged, setHomeWidgetId]);

	return [homeWidgetId, setHomeWidgetId];
};
