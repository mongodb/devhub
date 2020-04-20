// Fetches podcast info from https://mongodb.libsyn.com/rss

const RSS_URL = `https://mongodb.libsyn.com/rss`;
let prodcastList = [];

export const parsePodcasts = podcastXML => {
    for (var podcast of podcastXML) {
        const title = podcast.getElementsByTagName('title')[0].innerHTML;
        const pubDate = podcast.getElementsByTagName('pubDate')[0].innerHTML;
        const summary = podcast.getElementsByTagName('itunes:summary')[0]
            .innerHTML;
        const url = podcast
            .getElementsByTagName('enclosure')[0]
            .getAttribute('url');

        var podcastJSON = {
            title: title,
            publishDate: pubDate,
            summary: summary,
            url: url,
        };
        prodcastList.push(podcastJSON);
    }
    return prodcastList;
};

const getLybsinPodcasts = async () => {
    try {
        const response = await fetch(RSS_URL);
        if (response) {
            const responseData = await response.text();
            const xmlDoc = new window.DOMParser().parseFromString(
                responseData,
                'text/xml'
            );
            const podcastXML = xmlDoc.getElementsByTagName('item');
            podcastXML[podcastXML.length - 1].remove(); //removing the intro podcast
            const podcastList = parsePodcasts(podcastXML);
            return podcastList;
        }
    } catch (e) {
        console.error(e);
    }
    return [];
};

export default getLybsinPodcasts;
