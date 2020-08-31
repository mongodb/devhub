import { useEffect, useState } from 'react';

const isBadResponse = response => !response || (response && !response.ok);

const getErrorMessage = (response, method) =>
    response
        ? `${method} Error: ${response.status} - ${response.statusText}`
        : `${method} Error: Did not receive a response from the server`;

function useFetch(url, postprocessData, debounceTime) {
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
            const parsedData = await postprocessData(resp);
            if (parsedData) {
                setError(null);
                setData(parsedData);
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
