import { htmlToText } from 'html-to-text';
import parser from 'fast-xml-parser';
import dlv from 'dlv';

const simplifyPodcast = podcast => {
    const podcastJSON = {
        mediaType: 'podcast',
        title: podcast['title'],
        publishDate: podcast['pubDate'],
        description: podcast['description'].replace(/<[^>]+>/g, ''),
        rawDescription: podcast['description'].replace(
            /a href/g,
            'a target="_blank" href'
        ),
        url: podcast['enclosure'] && podcast['enclosure']['url'],
        thumbnailUrl:
            podcast['itunes:image'] && podcast['itunes:image']['href'],
    };
    return podcastJSON;
};

export const parsePodcasts = podcastXML => {
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
