// We want to omit empty fields from the XML entirely
const handlePossiblyEmptyField = (
    article,
    fieldName,
    tagName,
    getField = x => x
) =>
    article[fieldName]
        ? [...article[fieldName].map(a => ({ [tagName]: getField(a) }))]
        : null;

const getCustomRSSElements = article => {
    const authorNames = handlePossiblyEmptyField(
        article,
        'authors',
        'author_name',
        a => a.name
    );
    const languages = handlePossiblyEmptyField(
        article,
        'languages',
        'language'
    );
    const products = handlePossiblyEmptyField(article, 'products', 'product');
    const tags = handlePossiblyEmptyField(article, 'tags', 'tag');
    const customElements = [
        { atf_image: article.atfimage },
        { slug: article.slug },
        { type: article.type },
    ];
    if (authorNames) {
        customElements.push({ author_names: authorNames });
    }
    if (languages) {
        customElements.push({ languages: languages });
    }
    if (products) {
        customElements.push({ products: products });
    }
    if (tags) {
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
