import dlv from 'dlv';
import {Article} from '../interfaces/article';
import {ArticleCategory} from '../types/article-category';
import { ArticleSEO } from '../types/article-seo';
import { toDateString } from '../utils/format-dates';
import { mapTagTypeToUrl } from '../utils/map-tag-type-to-url';
import { getNestedText } from '../utils/get-nested-text';
import {SITE_URL} from '../constants';
import { addTrailingSlashIfMissing } from '../utils/add-trailing-slash-if-missing';
import { getNestedValue } from '../utils/get-nested-value';
import { findSectionHeadings } from '../utils/find-section-headings';

/**
 * Name map of directives we want to display in an article
 */
const contentNodesMap = {
    introduction: true,
    prerequisites: true,
    content: true,
    summary: true,
};

const dateFormatOptions = {
    month: 'short',
    day: '2-digit',
    year: 'numeric',
    timeZone: 'UTC',
};

/**
 * search the ast for the few directives we need to display content
 * TODO this ignores some important meta like Twitter for now
 * @param {array} nodes
 * @returns {array} array of childNodes with our main content
 */
const getContent = nodes => {
    const nodesWeActuallyWant = [];
    for (let nodeIndex = 0; nodeIndex < nodes.length; nodeIndex++) {
        const childNode = nodes[nodeIndex];
        // check top level directives first
        if (contentNodesMap[childNode.name]) {
          //@ts-ignore
            nodesWeActuallyWant.push(childNode);
        }
        // Some content nodes will be children of section nodes
        else if (childNode.type === 'section') {
            for (
                let childIndex = 0;
                childIndex < childNode.children.length;
                childIndex++
            ) {
                const grandChildNode = childNode.children[childIndex];
                if (contentNodesMap[grandChildNode.name]) {
                  //@ts-ignore
                    nodesWeActuallyWant.push(grandChildNode);
                }
            }
        }
    }

    return nodesWeActuallyWant;
};

const isExternalUrl = /^http(s)?:\/\//;

const getImageSrc = (src, siteUrl) => {
    if (!src) {
        return null;
    }

    return isExternalUrl.test(src) ? src : siteUrl + src;
};

export class SnootyArticle implements Article {
  authors: object[];
  contentAST: object[];
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
  constructor(slug, pageNodes) {
    const articleUrl = addTrailingSlashIfMissing(`${SITE_URL}/${slug}`);
    const canonicalUrl = dlv(
        pageNodes,
        'ast.options.canonical-href',
        articleUrl
    );
    const childNodes = dlv(pageNodes, 'ast.children', []);
    const contentNodes = getContent(childNodes);
    const meta = dlv(pageNodes, 'query_fields', {});
    const og = meta.og || {};
    const ogDescription =
        og.children && og.children.length ? getNestedText(og.children) : null;
    const twitterNode = childNodes.find(node => node.name === 'twitter') || {options: {}};
    const metaDescriptionNode = childNodes.find(
        node => node.name === 'meta-description'
    );
    const metaDescription =
        metaDescriptionNode && getNestedText(metaDescriptionNode.children);
        const formattedPublishedDate = toDateString(
        meta.pubdate,
        dateFormatOptions
    );
    const formattedUpdatedDate = toDateString(
        meta['updated-date'],
        dateFormatOptions
    );
    this.authors = meta.author;
    this.contentAST = contentNodes;
    this.slug = slug;
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
        creator: '',
        description: twitterNode
        ? twitterNode.options.description || getNestedText(twitterNode.children)
        : null,
        image: twitterNode.options.image
        ? getImageSrc(twitterNode.options.image, SITE_URL)
        : null,
        site: twitterNode.options.site,
        title: twitterNode.options.title,
      }
    };
    this.headingNodes = findSectionHeadings(
        getNestedValue(['ast', 'children'], pageNodes) || [],
        'type',
        'heading',
        1
    );
    this.image = meta['atf-image'];
    this.languages = mapTagTypeToUrl(meta.languages, 'language');
    this.products = mapTagTypeToUrl(meta.products, 'product');
    this.publishedDate = formattedPublishedDate;
    this.related = meta.related;
    this.tags = mapTagTypeToUrl(meta.tags, 'tag');
    this.title = dlv(meta.title, [0, 'value'], slug);
    this.type = meta.type;
    this.updatedDate = formattedUpdatedDate;
  }
}
