import axios from 'axios';
import useSWR from 'swr';

const fetcher = uri => axios.get(uri).then(res => res.data);

export const useSuggestions = userInput => {
	// retrieve 5 city matches
	const uri = `http://localhost:3000/places?city_like=${userInput}&_limit=5`;

	const { data: suggestions, error } = useSWR(uri, fetcher, {
		onErrorRetry: (error, _key, _config, revalidate, { retryCount }) => {
			if (error.status === 404 || retryCount >= 10) return;
			setTimeout(() => revalidate({ retryCount }), 5000);
		},
	});

	return {
		suggestions,
		loading: !error && !suggestions,
		error,
	};
};
