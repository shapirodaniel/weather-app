import { useState, useEffect } from 'react';
import axios from 'axios';
import { parseGeolocation } from './helpers/geocoding/geocodingParsers';

export const useGeolocation = cityName => {
	const [state, setState] = useState({});

	useEffect(() => {
		const fetchGeolocation = async () => {
			try {
				const { data: fetchedGeolocation } = await axios.post(
					'/api/geoLocation',
					{ cityName }
				);

				setState(fetchedGeolocation);
			} catch (err) {
				console.error(err);
				setState({ ...state, error: err });
			}
		};

		if (cityName) fetchGeolocation();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [cityName]);

	return {
		geolocation: state && parseGeolocation(state[0]),
		geolocationLoading: !state && !state.error,
		geolocationError: state.error,
	};
};
