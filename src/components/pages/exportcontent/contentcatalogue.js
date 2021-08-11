import React, { useState, useEffect } from 'react';
import { useLocation } from '@reach/router';
import { buildQueryString, parseQueryString } from '~utils/query-string';

const SIMPLESEARCHURL = `https://us-east-1.aws.webhooks.mongodb-realm.com/api/client/v2.0/app/devhub-search-service-dxfcg/service/devhub_export/incoming_webhook/simplesearch`;
const COMPOSITESEARCHURL = `https://us-east-1.aws.webhooks.mongodb-realm.com/api/client/v2.0/app/devhub-search-service-dxfcg/service/devhub_export/incoming_webhook/compositesearch`;

const ContentCatalogue = () => {
    const { search } = useLocation();
    const { ...params } = parseQueryString(search);
    const queryParams = buildQueryString(params);
    const urlEndPoint =
        'content' in params ? SIMPLESEARCHURL : COMPOSITESEARCHURL;
    const [searchResult, setSearchResult] = useState(null);
    useEffect(() => {
        const url = `${urlEndPoint}${queryParams}`;
        fetch(url)
            .then(response => response.json())
            .then(data => setSearchResult(data));
    }, []);
    return (
        searchResult && (
            <div>
                <pre>{JSON.stringify(searchResult, null, 2)}</pre>
            </div>
        )
    );
};

export default ContentCatalogue;
