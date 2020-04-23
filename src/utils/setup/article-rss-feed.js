const { rssFeedArticleData } = require('../../queries/rss-feed-article-data');
const { serializeRssData } = require('./serialize-rss-data');

const articleRssFeed = {
    serialize: serializeRssData,
    query: rssFeedArticleData,
    output: '/rss.xml',
    title: 'MongoDB Developer Hub RSS Feed',
    image_url: 'https://media.mongodb.org/favicon.ico',
    site_url: 'https://developer.mongodb.com',
    feed_url: 'https://developer.mongodb.com/rss.xml',
};

module.exports = { articleRssFeed };
