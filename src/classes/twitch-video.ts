import { VideoResponse } from '../interfaces/responses/video-response';
import { Video } from '~src/interfaces/video';
import { VideoType } from '~src/types/video-type';
import { getTagPageUriComponent } from '../utils/get-tag-page-uri-component';
import { mapTagTypeToUrl } from '../utils/map-tag-type-to-url';
import { transformAuthorStrapiData } from '../utils/setup/transform-author-strapi-data';
import { StrapiAuthor } from '../classes/strapi-author';

export class TwitchVideo implements Video {
    description: string;
    mediaType: VideoType;
    publishDate: string;
    slug: string;
    thumbnailUrl: string;
    title: string;
    videoId: string;
    SEO: object;
    tags: object[];
    products: object[];
    languages: object[];
    authors: object[];
    related: object[];

    constructor(video: VideoResponse) {
        this.description = video.description;
        this.mediaType = 'twitch';
        this.publishDate = video.originalPublishDate;
        this.slug = video.slug;
        this.thumbnailUrl = video.thumbnailUrl;
        this.title = video.title;
        this.videoId = video.videoId;
        this.SEO = video.SEO;
        this.tags = mapTagTypeToUrl(video.tags.map(item => item['tag']), 'tag', true);
        this.products = mapTagTypeToUrl(video.products.map(item => item['product']), 'product', true);
        this.languages = mapTagTypeToUrl(video.languages.map(item => item['language']), 'language', true);
        this.authors = video.authors.map((a) =>
            new StrapiAuthor({name: a['name'], bio: a['bio'], location: a['location'], image: a['image']['url'], title: a['title']}));
        this.related = video.related_content
            ? video.related_content.map(({ label, url }) => ({
                name: 'reference',
                refuri: url,
                children: [{ value: label }],
            }))
            : [];
    }
}



