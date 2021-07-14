const {
    searchArticleRSSData,
} = require('../../queries/search-article-rss-data');
const { serializeSearchRssData } = require('./serialize-search-rss-data');

const searchRssFeed = siteUrl => ({
    serialize: serializeSearchRssData,
    query: searchArticleRSSData,
    output: '/search-rss.xml',
    title: 'MongoDB Developer Hub (Expanded)',
    site_url: siteUrl,
    feed_url: siteUrl + '/search-rss.xml',
});

module.exports = { searchRssFeed };
