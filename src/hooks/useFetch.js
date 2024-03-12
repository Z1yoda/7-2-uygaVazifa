import { useEffect, useState } from "react";

function useFetch(url) {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        setLoading(true);
        fetch(url, {
            method: 'GET',
        })
            .then(res => res.json())
            .then(fetched => {
                if (fetched.data && Array.isArray(fetched.data)) {
                    setData(fetched.data);
                    setError('');
                }
            })
            .catch(err => {
                setLoading(false);
                setError(err.message || 'Error fetching movies');
                console.error('Error fetching movies:', err);
            })
            .finally(() => {
                setLoading(false);
            });
    }, [url]);

    return { data, loading, error };
}

export { useFetch };

