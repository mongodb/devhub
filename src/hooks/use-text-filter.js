import { useEffect, useState } from 'react';
import { requestTextFilterResults } from '../utils/devhub-api-stitch';

// Only kick off one search every 200ms
const DEBOUNCE_TIME = 200;

/**
 * Custom hook that fetches results of a given text filter query and handles
 * postprocessing of data from Realm
 * @param {*} query the text filter query to use for searching
 */
function useTextFilter(query) {
    const [filterEvent, setFilterEvent] = useState(null);
    const [results, setResults] = useState(null);

    // When the query changes, let's re-fetch from Stitch (debounce)
    useEffect(() => {
        const fetchTextFilterResults = async () => {
            if (filterEvent) {
                clearTimeout(filterEvent);
            }
            setFilterEvent(
                setTimeout(async () => {
                    const filterResults = await requestTextFilterResults(query);
                    if (filterResults) {
                        setResults(filterResults);
                    }
                }, DEBOUNCE_TIME)
            );
        };
        fetchTextFilterResults();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [query]);

    return { results };
}

export default useTextFilter;
