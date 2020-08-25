const {
    searchArticleRSSData,
} = require('../../queries/search-article-rss-data');
const { serializeSearchRssData } = require('./serialize-search-rss-data');

const siteUrl = 'https://developer.mongodb.com';

const searchRssFeed = {
    serialize: serializeSearchRssData,
    query: searchArticleRSSData,
    output: '/search-rss.xml',
    title: 'MongoDB Developer Hub (Expanded)',
    site_url: siteUrl,
    feed_url: siteUrl + '/search-rss.xml',
};

module.exports = { searchRssFeed };
