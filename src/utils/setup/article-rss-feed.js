const { rssFeedArticleData } = require('../../queries/rss-feed-article-data');
const { serializeRssData } = require('./serialize-rss-data');

const articleRssFeed = {
    serialize: serializeRssData,
    query: rssFeedArticleData,
    output: '/rss.xml',
    title: 'MongoDB Developer Hub',
    image_url: '/images/MongoDB_Leaf.svg',
    site_url: 'https://developer.mongodb.com',
    feed_url: 'https://developer.mongodb.com/rss.xml',
};

module.exports = { articleRssFeed };
