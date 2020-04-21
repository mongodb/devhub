// Fetches podcast info from https://mongodb.libsyn.com/rss

const RSS_URL = `https://mongodb.libsyn.com/rss`;

export const simplifyPodcast = podcast => {
    const podcastJSON = {
        title: podcast['title'],
        publishDate: podcast['pubDate'],
        summary: podcast['itunes:summary'],
        url: podcast['enclosure']['@_url'],
    };
    return podcastJSON;
};

export const parsePodcasts = podcastXML => {
    var parser = require('fast-xml-parser');

    var options = {
        ignoreAttributes: false,
        parseAttributeValue: true,
    };

    try {
        var jsonObj = parser.parse(podcastXML, options, true);
        const podcasts = jsonObj.rss.channel.item;
        podcasts.pop(); //removing the introductory podcast

        const parsedPodcasts = podcasts.map(item => simplifyPodcast(item));
        return parsedPodcasts;
    } catch (error) {
        console.log(error.message);
    }

    return [];
};

const getLybsinPodcasts = async () => {
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

export default getLybsinPodcasts;
