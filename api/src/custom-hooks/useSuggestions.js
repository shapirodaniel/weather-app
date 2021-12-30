// import axios from 'axios';
// import useSWR from 'swr';

// const fetcher = uri => axios.get(uri).then(res => res.data);

// export const useSuggestions = userInput => {
// 	const uri = `http://localhost:8080/places?city_like=${userInput}&_limit=5`;

// 	const { data: suggestions, error } = useSWR(uri, fetcher, {
// 		onErrorRetry: (error, _key, _config, revalidate, { retryCount }) => {
// 			if (error.status === 404 || retryCount >= 10) return;
// 			setTimeout(() => revalidate({ retryCount }), 5000);
// 		},
// 	});

// 	return {
// 		suggestions,
// 		loading: !error && !suggestions,
// 		error,
// 	};
// };

/* for ease of deploying the mvp, this solution lets us just query our places array without taking an API trip */

import { useState, useEffect } from 'react';
import { places } from '../places';

export const useSuggestions = userInput => {
	const [found, setFound] = useState([]);

	useEffect(() => {
		if (userInput) {
			setFound(
				// mocks limit=5
				places.filter(place => place.city.includes(userInput)).slice(0, 5)
			);
		}
	}, [userInput]);

	return { suggestions: found };
};
