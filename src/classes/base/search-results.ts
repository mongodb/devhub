import dlv from 'dlv';
import { mapTagTypeToUrl } from '../../utils/map-tag-type-to-url';
import { StrapiAuthor } from '../strapi-author';


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
    score: number;
    

    constructor(result) {
        this.description = result.description
        this.mediaType = result.mediaType;
        this.publishDate = result.pubDate;
        this.slug = result.slug;
        this.title = dlv(result.title, [0, 'value'], result.slug);
        this.languages = mapTagTypeToUrl(result.languages, 'language');
        this.products = mapTagTypeToUrl(result.products, 'product');
        this.tags = mapTagTypeToUrl(result.tags, 'tag');
        this.authors = result.authors && result.authors.map((a) =>
            new StrapiAuthor({name: a['name'], bio: a['bio'], location: a['location'], image: a['image']['url'], title: a['title']}));
        this.score = result.score
    }
}