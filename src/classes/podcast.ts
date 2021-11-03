import { PodcastResponse } from '../interfaces/responses/podcast-response';
import { VideoType } from '~src/types/video-type';
import { getTagPageUriComponent } from '../utils/get-tag-page-uri-component';
import { mapTagTypeToUrl } from '../utils/map-tag-type-to-url';
import { IPodcast } from '../interfaces/podcast';
import { transformAuthorStrapiData } from '../utils/setup/transform-author-strapi-data';
import { StrapiAuthor } from '../classes/strapi-author';

export class Podcast implements IPodcast{
    description: string;
    mediaType: string;
    publishDate: string;
    rawDescription: string;
    slug: string;
    thumbnailUrl: string;
    title: string;
    url: string;
    SEO: object;
    tags: object[];
    products: object[];
    languages: object[];
    authors: object[];
    related: object[];

    constructor(podcast: PodcastResponse) {
        this.mediaType = 'podcast';
        this.title = podcast.title;
        this.publishDate = podcast.originalPublishDate;
        this.description = podcast.description.replace(/<[^>]+>/g, '');
        this.rawDescription = podcast.description.replace(
            /a href/g,
            'a target="_blank" href'
        );
        this.url = podcast.podcastFileUrl;
        this.thumbnailUrl = podcast.thumbnailUrl;
        this.slug = podcast.slug;
        this.SEO = podcast.SEO;
        this.tags = mapTagTypeToUrl(podcast.tags.map(item => item['tag']), 'tag', true);
        this.products = mapTagTypeToUrl(podcast.products.map(item => item['product']), 'product', true);
        this.languages = mapTagTypeToUrl(podcast.languages.map(item => item['language']), 'language', true);
        this.authors = podcast.authors.map((a) =>
            new StrapiAuthor({name: a['name'], bio: a['bio'], location: a['location'], image: a['image']['url'], title: a['title']}));
        this.related = podcast.related_content
            ? podcast.related_content.map(({ label, url }) => ({
                name: 'reference',
                refuri: url,
                children: [{ value: label }],
            }))
            : [];
    }
}