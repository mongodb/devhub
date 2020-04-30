import parser from 'fast-xml-parser';
import dlv from 'dlv';

// Fetches and parses podcast info from https://mongodb.libsyn.com/rss

const RSS_URL = `https://mongodb.libsyn.com/rss`;

const simplifyPodcast = podcast => {
    const podcastJSON = {
        mediaType: 'podcast',
        title: podcast['title'],
        publishDate: podcast['pubDate'],
        description: podcast['itunes:summary'],
        url: podcast['enclosure'] && podcast['enclosure']['url'],
        thumbnailUrl:
            podcast['itunes:image'] && podcast['itunes:image']['href'],
    };
    return podcastJSON;
};

const parsePodcasts = podcastXML => {
    const options = {
        attributeNamePrefix: '',
        ignoreAttributes: false,
        parseAttributeValue: true,
    };

    try {
        const jsonObj = parser.parse(podcastXML, options, true);
        const podcasts = dlv(jsonObj, 'rss.channel.item', []);
        const parsedPodcasts = podcasts.map(simplifyPodcast);
        return parsedPodcasts;
    } catch (error) {
        console.log(error.message);
    }

    return [];
};

const fetchLybsinPodcasts = async () => {
    try {
        const response = await fetch(RSS_URL);
        if (response) {
            const podcastXML = await response.text();
            const podcastList = parsePodcasts(podcastXML);
            return podcastList;
        }
    } catch (e) {
        console.error(e);
    }
    return [];
};

export default fetchLybsinPodcasts;
