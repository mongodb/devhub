import React, { useEffect } from 'react';

/**
 * Component to embed a Discourse community forums thread on a page. Uses the
 * canonical URL to identify which thread in Discourse to use. If no thread
 * exists, loading this page for the first-time will create such thread.
 *
 * Discourse Embed API: https://meta.discourse.org/t/embedding-discourse-comments-via-javascript/31963
 *
 * @param {string} canonicalUrl The Canonical URL of the page to embed forums on
 * This canonical url will be used to sync with a forums thread
 * @returns div with an id to be used by Discourse to populate
 */
const ForumEmbed = ({ canonicalUrl }) => {
    useEffect(() => {
        window.DiscourseEmbed = {
            discourseUrl: process.env.DISCOURSE_URL,
            discourseEmbedUrl: canonicalUrl,
        };

        (function () {
            var d = document.createElement('script');
            d.type = 'text/javascript';
            d.async = true;
            d.src = window.DiscourseEmbed.discourseUrl + 'javascripts/embed.js';
            (
                document.getElementsByTagName('head')[0] ||
                document.getElementsByTagName('body')[0]
            ).appendChild(d);
        })();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return <div id="discourse-comments"></div>;
};

export default ForumEmbed;
