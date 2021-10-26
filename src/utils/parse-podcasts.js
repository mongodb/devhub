import { mapTagTypeToUrl } from '../utils/map-tag-type-to-url';

const simplifyPodcast = podcast => {
    const podcastJSON = {
        mediaType: 'podcast',
        title: podcast['title'],
        publishDate: podcast['originalPublishDate'],
        description: podcast['description'].replace(/<[^>]+>/g, ''),
        rawDescription: podcast['description'].replace(
            /a href/g,
            'a target="_blank" href'
        ),
        url: podcast['podcastFileUrl'],
        thumbnailUrl: podcast['thumbnailUrl'],
        slug: podcast['slug'],
        tags: mapTagTypeToUrl(
            podcast['tags'].map(item => item['tag']),
            'tag',
            true
        ),
        products: mapTagTypeToUrl(
            podcast['products'].map(item => item['product']),
            'product',
            true
        ),
        languages: mapTagTypeToUrl(
            podcast['languages'].map(item => item['language']),
            'language',
            true
        ),
        authors: [],
    };
    return podcastJSON;
};
export const parsePodcasts = podcasts => {
    try {
        const parsedPodcasts = podcasts.map(simplifyPodcast);
        return parsedPodcasts;
    } catch (error) {
        console.log('Error parsing podcasts', error.message);
    }
    return [];
};
