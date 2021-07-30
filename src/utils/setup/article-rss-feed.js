const { rssFeedArticleData } = require('../../queries/rss-feed-article-data');
const { serializeRssData } = require('./serialize-rss-data');

const articleRssFeed = siteUrl => ({
    serialize: serializeRssData,
    query: rssFeedArticleData,
    output: '/rss.xml',
    title: 'MongoDB Developer Hub',
    image_url: siteUrl + '/public/images/MongoDB_Leaf.svg',
    site_url: siteUrl,
    feed_url: siteUrl + '/rss.xml',
});

module.exports = { articleRssFeed };
