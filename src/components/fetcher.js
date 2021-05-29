import axios from 'axios';

export const fetcher = uri => axios.get(uri).then(res => res.data);
