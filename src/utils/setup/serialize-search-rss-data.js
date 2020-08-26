const getCustomRSSElements = article => {
    const authorNames = article.authors
        ? [...article.authors.map(a => ({ author_name: a.name }))]
        : [];
    const tags = article.tags ? [...article.tags.map(t => ({ tag: t }))] : [];
    const customElements = [{ type: article.type }];
    if (authorNames.length) {
        customElements.push({ author_names: authorNames });
    }
    if (tags.length) {
        customElements.push({ tags: tags });
    }
    return customElements;
};

const serializeSearchRssData = ({ query: { site, allArticle } }) =>
    allArticle.nodes.map(article => ({
        custom_elements: getCustomRSSElements(article),
        date: article.pubdate,
        description: article.description,
        title: article.title,
        url: `${site.siteMetadata.siteUrl}/${article.slug}`,
    }));

module.exports = { serializeSearchRssData };
