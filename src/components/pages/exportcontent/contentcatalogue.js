import React, { useState, useEffect } from 'react';
import { useLocation } from '@reach/router';
import queryString from 'query-string';
import { parseQueryString } from '~utils/query-string';

const URL = `https://us-east-1.aws.webhooks.mongodb-realm.com/api/client/v2.0/app/devhub-search-service-dxfcg/service/devhub_export/incoming_webhook/devhubexport`;

const ContentCatalogue = () => {
    const { search } = useLocation();
    const { ...params } = parseQueryString(search);
    const { content, text } = params;
    const [searchResult, setSearchResult] = useState(null);
    useEffect(() => {
        const url = `${URL}?content=${content}&text=${text}`;
        fetch(url)
            .then(response => response.json())
            .then(data => setSearchResult(data));
    }, []);
    return searchResult && <div>{JSON.stringify(searchResult)}</div>;
};

export default ContentCatalogue;
