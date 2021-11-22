import { useEffect, useState } from 'react';
import { requestTextFilterResults } from '../utils/devhub-api-stitch';
import { SearchArticleResult } from '../classes/search-article-result';
import { SearchVideoResult } from '../classes/search-video-result';
import { SearchPodcastResult } from '../classes/search-podcast-result';
import { LearnPageTabs } from '../utils/learn-page-tabs';
// Only kick off one search every 200ms
const DEBOUNCE_TIME = 200;

/**
 * Custom hook that fetches results of a given text filter query and handles
 * postprocessing of data from Realm
 * @param {*} query the text filter query to use for searching
 */
function useTextFilter(query, activeContentTab) {
    const [filterEvent, setFilterEvent] = useState(null);
    const [results, setResults] = useState(null);

    /**
     * Gets all results
     * @param {Array} filterResults
     * @returns {Array}
     */
    const getAll = filterResults => {
        return filterResults.map(r => {
            switch (r.mediaType) {
                case 'youtube':
                case 'twitch':
                    return {
                        ...new SearchVideoResult(r),
                    };
                case 'podcast':
                    return {
                        ...new SearchPodcastResult(r),
                    };
                default:
                    return {
                        ...new SearchArticleResult(r),
                    };
            }
        });
    };

    /**
     * Extracts only articles from filterResults
     * @param {Array} filterResults
     * @returns {Array}
     */
    const getArticles = filterResults => {
        return filterResults.reduce((results, r) => {
            if (r.mediaType === 'article') {
                results.push({ ...new SearchArticleResult(r) });
            }
            return results;
        }, []);
    };

    /**
     * Extracts only twitch or youtube videos from filterResults
     * @param {Array} filterResults
     * @returns {Array}
     */
    const getVideos = filterResults => {
        return filterResults.reduce((results, r) => {
            if (r.mediaType === 'twitch' || r.mediaType === 'youtube') {
                results.push({ ...new SearchVideoResult(r) });
            }
            return results;
        }, []);
    };

    /**
     * Extracts only articles from filterResults
     * @param {Array} filterResults
     * @returns {Array}
     */
    const getPodcasts = filterResults => {
        return filterResults.reduce((results, r) => {
            if (r.mediaType === 'podcast') {
                results.push({ ...new SearchPodcastResult(r) });
            }
            return results;
        }, []);
    };

    // When the query changes, let's re-fetch from Stitch (debounce)
    useEffect(() => {
        if (query) {
            const fetchTextFilterResults = async () => {
                if (filterEvent) {
                    clearTimeout(filterEvent);
                }
                setFilterEvent(
                    setTimeout(async () => {
                        const filterResults = await requestTextFilterResults(
                            query
                        );
                        if (filterResults) {
                            switch (activeContentTab) {
                                case LearnPageTabs.articles:
                                    const articles = getArticles(filterResults);
                                    setResults(articles);
                                    break;
                                case LearnPageTabs.podcasts:
                                    const podcasts = getPodcasts(filterResults);
                                    setResults(podcasts);
                                    break;
                                case LearnPageTabs.videos:
                                    const videos = getVideos(filterResults);
                                    setResults(videos);
                                    break;
                                default:
                                    const all = getAll(filterResults);
                                    setResults(all);
                            }
                        }
                    }, DEBOUNCE_TIME)
                );
            };
            fetchTextFilterResults();
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [query, activeContentTab]);

    return { results };
}

export default useTextFilter;
