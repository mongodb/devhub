import { useEffect, useState } from 'react';

const isBadResponse = response => !response || (response && !response.ok);

const getErrorMessage = (response, method) =>
    response
        ? `${method} Error: ${response.status} - ${response.statusText}`
        : `${method} Error: Did not receive a response from the server`;

/**
 * Hook with option to debounce to fetch JSON data (GET requests)
 * @param {*} url The url to fetch from
 * @param {*} debounceTime (Optional) if provided, will debounce the fetch based on this number of ms
 */
function useFetch(url, debounceTime) {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [fetchEvent, setFetchEvent] = useState(null);
    const fetchData = async () => {
        const resp = await fetch(url);
        if (isBadResponse(resp)) {
            const errorMessage = getErrorMessage(resp, 'GET');
            console.warn(errorMessage);
            setError(errorMessage);
            setData(null);
        } else {
            const jsonData = await resp.json();
            if (jsonData) {
                setError(null);
                setData(jsonData);
            }
        }
    };
    useEffect(() => {
        const getData = async () => {
            if (debounceTime) {
                if (fetchEvent) {
                    clearTimeout(fetchEvent);
                }
                setFetchEvent(setTimeout(fetchData, debounceTime));
            } else {
                fetchData();
            }
        };
        getData();
        // Disabling exhaustive dep check, since we don't want to run this effect
        // every time fetchEvent is updated (which would cause an infinite loop)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [debounceTime, url]);

    return { data, error };
}

export default useFetch;
