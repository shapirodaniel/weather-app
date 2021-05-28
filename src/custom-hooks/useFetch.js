import axios from 'axios';
import { useEffect, useRef } from 'react';

export const useFetch = uri => {
	let fetchRef = useRef({ data: {}, status: null, error: '', numRetries: 0 });

	useEffect(() => {
		let isMounted = true;

		const fetchData = async () => {
			while (
				fetchRef.current.status !== 200 &&
				fetchRef.current.numRetries < 2
			) {
				try {
					const { data, status } = await axios.get(uri);
					fetchRef.current.data = data;
					fetchRef.current.status = status;
				} catch (err) {
					fetchRef.current.numRetries++;
					fetchRef.current.error = err;
					console.error(err);
				}
			}
		};

		if (isMounted) {
			fetchData();
		}

		return () => {
			isMounted = false;
		};
	}, [uri]);

	const { data, error } = fetchRef;

	return { data, error, loading: !data && !error };
};
