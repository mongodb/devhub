import dlv from 'dlv';
import { Article } from '../interfaces/article';
import { ArticleCategory } from '../types/article-category';
import { ArticleSEO } from '../types/article-seo';
import { toDateString } from '../utils/format-dates';
import { mapTagTypeToUrl } from '../utils/map-tag-type-to-url';
import { getNestedText } from '../utils/get-nested-text';
import { SITE_URL } from '../constants';
import { addTrailingSlashIfMissing } from '../utils/add-trailing-slash-if-missing';
import { getNestedValue } from '../utils/get-nested-value';
import { findSectionHeadings } from '../utils/find-section-headings';
import { getRelevantSnootyNodeContent } from '../utils/setup/get-relevant-snooty-node-content.js';
import { getImageSrc } from '../utils/get-image-src';
import { SnootyAuthor } from './snooty-author';
import { withPrefix } from 'gatsby';

const dateFormatOptions = {
    month: 'short',
    day: '2-digit',
    year: 'numeric',
    timeZone: 'UTC',
};

export class SnootyArticle implements Article {
    _id: String;
    authors: SnootyAuthor[];
    contentAST: object[];
    description: String;
    image: String;
    languages: object[];
    headingNodes: object[];
    products: object[];
    publishedDate: String;
    related: object[];
    SEO: ArticleSEO;
    slug: String;
    tags: object[];
    title: String;
    type: ArticleCategory;
    updatedDate: String;
    constructor(slug, pageNodes, slugContentMapping, pathPrefix) {
        this._id = pageNodes._id;
        const articleUrl = addTrailingSlashIfMissing(`${SITE_URL}/${slug}`);
        const canonicalUrl = dlv(
            pageNodes,
            'ast.options.canonical-href',
            articleUrl
        );
        const childNodes = dlv(pageNodes, 'ast.children', []);
        const contentAST = getRelevantSnootyNodeContent(childNodes);
        const meta = dlv(pageNodes, 'query_fields', {});
        const og = meta.og || {};
        const ogDescription =
            og.children && og.children.length
                ? getNestedText(og.children)
                : null;
        const twitterNode = childNodes.find(
            node => node.name === 'twitter'
        ) || { options: {} };
        const metaDescriptionNode = childNodes.find(
            node => node.name === 'meta-description'
        );
        const metaDescription =
            metaDescriptionNode && getNestedText(metaDescriptionNode.children);
        this.authors = meta.author.map(
            a => new SnootyAuthor(a, slugContentMapping)
        );
        this.contentAST = contentAST;
        this.description = getNestedText(meta['meta-description']);
        this.headingNodes = findSectionHeadings(
            getNestedValue(['ast', 'children'], pageNodes) || [],
            'type',
            'heading',
            1
        );
        // We need to manually use the second arg here since BASE_PREFIX isn't
        // defined yet.
        //@ts-ignore
        this.image = withPrefix(meta['atf-image'], pathPrefix);
        this.languages = mapTagTypeToUrl(meta.languages, 'language');
        this.products = mapTagTypeToUrl(meta.products, 'product');
        this.publishedDate = meta.pubdate;
        this.related = meta.related || [];
        this.SEO = {
            canonicalUrl,
            metaDescription,
            og: {
                description: ogDescription,
                image: og.image,
                title: og.title,
                type: og.type,
                url: og.url,
            },
            twitter: {
                creator: twitterNode.options.creator,
                description: twitterNode
                    ? twitterNode.options.description ||
                      getNestedText(twitterNode.children)
                    : null,
                image: twitterNode.options.image
                    ? getImageSrc(twitterNode.options.image, SITE_URL)
                    : null,
                site: twitterNode.options.site,
                title: twitterNode.options.title,
            },
        };
        this.slug = slug;
        this.tags = mapTagTypeToUrl(meta.tags, 'tag');
        this.title = dlv(meta.title, [0, 'value'], slug);
        this.type = meta.type;
        this.updatedDate = meta['updated-date'];
    }
}
