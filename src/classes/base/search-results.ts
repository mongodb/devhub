import dlv from 'dlv';
import { mapTagTypeToUrl } from '../../utils/map-tag-type-to-url';
import { StrapiAuthor } from '../strapi-author';
import { formatRelatedContent } from '../../utils/format-related-content'


export class SearchResult {
    description: string
    mediaType: string;
    publishDate: string;
    slug: string;
    title: string;
    tags: object[];
    products: object[];
    languages: object[];
    authors: object[];
    related: object[];
    score: number;
    

    constructor(result) {
        this.description = result.description
        this.mediaType = result.mediaType;
        this.publishDate = result.pubDate;
        this.slug = result.slug;
        this.title = dlv(result.title, [0, 'value'], result.slug);
        this.tags = result.tags && mapTagTypeToUrl(result.tags.map(item => item['tag']), 'tag', true);
        this.products = result.products && mapTagTypeToUrl(result.products.map(item => item['product']), 'product', true);
        this.languages = result.languages && mapTagTypeToUrl(result.languages.map(item => item['language']), 'language', true);
        this.authors = result.authors && result.authors.map((a) =>
            new StrapiAuthor({name: a['name'], bio: a['bio'], location: a['location'], image: a['image']['url'], title: a['title']}));
        this.related = formatRelatedContent(result.related_content);
        this.score = result.score
    }
}