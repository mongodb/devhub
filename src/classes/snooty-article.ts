import dlv from 'dlv';
import {Article} from '../interfaces/article';
import {ArticleCategory} from '../types/article-category';
import { toDateString } from '../utils/format-dates';
import { mapTagTypeToUrl } from '../utils/map-tag-type-to-url';
import { getNestedText } from '../utils/get-nested-text';

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

export class SnootyArticle implements Article {
  authors: object[];
  contentAST: object[];
  image: String;
  languages: object[];
  products: object[];
  SEO: object;
  slug: String;
  tags: object[];
  title: String;
  type: ArticleCategory;
  constructor(slug, pageNodes) {
    const childNodes = dlv(pageNodes, 'ast.children', []);
    const contentNodes = getContent(childNodes);
    const meta = dlv(pageNodes, 'query_fields');
    const og = meta.og || {};
    const ogDescription =
        og.children && og.children.length ? getNestedText(og.children) : null;
    const twitterNode = childNodes.find(node => node.name === 'twitter');
    const metaDescriptionNode = childNodes.find(
        node => node.name === 'meta-description'
    );
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
      
    };
    this.image = meta['atf-image'];
    this.languages = mapTagTypeToUrl(meta.languages, 'language');
    this.products = mapTagTypeToUrl(meta.products, 'product');
    this.tags = mapTagTypeToUrl(meta.tags, 'tag');
    this.title = dlv(meta.title, [0, 'value'], slug);
    this.type = meta.type;
  }
}
