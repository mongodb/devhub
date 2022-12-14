const typeMap = {
    Article: 'article',
    Community: 'community',
    HowTo: 'how-to',
    Quickstart: 'quickstart',
};

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
    const rawContent = article.rawContent;
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
    if (rawContent) {
        customElements.push({ raw_content: rawContent });
    }
    if (tags) {
        customElements.push({ tags: tags });
    }
    return customElements;
};

const getStrapiCustomRSSElements = article => {
    let authorNames;
    try {
        authorNames = article.authors.map(a => ({ author_name: a.name }));
    } catch (error) {
        // TODO: this datatype should always be an array
        authorNames = [{ author_name: article.authors.name }];
    }
    const languages = article.languages;
    const products = article.products;
    const tags = article.tags;
    const rawContent = article.content;
    const customElements = [
        { atf_image: article.image && article.image.url },
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
    if (rawContent) {
        customElements.push({ raw_content: rawContent });
    }
    if (tags) {
        customElements.push({ tags: tags });
    }
    return customElements;
};

const serializeSearchRssData = ({
    query: { site, allArticle, allStrapiArticles },
}) => {
    const strapiArticles = allStrapiArticles ? allStrapiArticles.nodes : [];
    return allArticle.nodes
        .map(article => ({
            custom_elements: getCustomRSSElements(article),
            date: article.pubdate,
            description: article.description,
            title: article.title,
            url: `${site.siteMetadata.siteUrl}/${article.slug}`,
        }))
        .concat(
            strapiArticles.map(article => {
                const slug = `${typeMap[article.type]}${article.slug}`;
                article.slug = slug;
                return {
                    custom_elements: getStrapiCustomRSSElements(article),
                    date: article.published_at,
                    description: article.description,
                    title: article.name,
                    url: `${site.siteMetadata.siteUrl}/${article.slug}`,
                };
            })
        );
};

module.exports = { serializeSearchRssData };
