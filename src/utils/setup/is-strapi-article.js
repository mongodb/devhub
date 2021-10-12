const STRAPI_COMPONENT_TYPE = 'article-info.strapi-article';

export const isStrapiArticle = articleObj =>
    articleObj.strapi_component === STRAPI_COMPONENT_TYPE;
