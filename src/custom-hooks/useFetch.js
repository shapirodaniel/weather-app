import axios from 'axios';
import { useEffect, useRef } from 'react';

export const useFetch = uri => {
	let fetchRef = useRef({ data: {}, status: null, error: '', numRetries: 0 });
	let { data, status, error, numRetries } = fetchRef.current;

	useEffect(() => {
		let isMounted = true;

		const fetchData = async () => {
			while (!status && numRetries < 2) {
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
	}, [uri, data, status, error, numRetries]);

	return { data, error };
};
