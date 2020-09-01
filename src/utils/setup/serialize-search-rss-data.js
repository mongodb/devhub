const getCustomRSSElements = article => {
    const authorNames = article.authors
        ? [...article.authors.map(a => ({ author_name: a.name }))]
        : [];
    const languages = article.languages
        ? [...article.languages.map(l => ({ language: l }))]
        : [];
    const products = article.products
        ? [...article.products.map(l => ({ product: l }))]
        : [];
    const tags = article.tags ? [...article.tags.map(t => ({ tag: t }))] : [];
    const customElements = [
        { atf_image: article.atfimage },
        { slug: article.slug },
        { type: article.type },
    ];
    if (authorNames.length) {
        customElements.push({ author_names: authorNames });
    }
    if (languages.length) {
        customElements.push({ languages: languages });
    }
    if (products.length) {
        customElements.push({ products: products });
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
