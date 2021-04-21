export const getLearnPageFilters = allArticles => {
    const languages = {};
    const products = {};

    allArticles.forEach(article => {
        const languagesForArticle = article.languages;
        const productsForArticle = article.products;
        // Go through languages for this article and update filter info.
        // Add a count of how many times this language appears and keep track
        // of how many itmes we see a product with this language
        if (languagesForArticle) {
            languagesForArticle.forEach(language => {
                const currentLanguage = languages[language];
                if (currentLanguage) {
                    currentLanguage.count++;
                } else {
                    // Update language reference directly in outer block object
                    languages[language] = {
                        count: 1,
                        products: {},
                    };
                }
                if (productsForArticle) {
                    // If this article also has products, update those counts as well for this language
                    const productsForLanguage = languages[language].products;
                    productsForArticle.forEach(product => {
                        productsForLanguage[product]
                            ? productsForLanguage[product]++
                            : (productsForLanguage[product] = 1);
                    });
                }
            });
        }
        // Go through products for this article and update filter info.
        // Add a count of how many times this product appears and keep track
        // of how many itmes we see a language with this product
        if (productsForArticle) {
            productsForArticle.forEach(product => {
                const currentProduct = products[product];
                if (currentProduct) {
                    currentProduct.count++;
                } else {
                    // Update product reference directly in outer block object
                    products[product] = {
                        count: 1,
                        languages: {},
                    };
                }
                if (languagesForArticle) {
                    // If this article also has languages, update those counts as well for this products
                    const languagesForProduct = products[product].languages;
                    languagesForArticle.forEach(language => {
                        languagesForProduct[language]
                            ? languagesForProduct[language]++
                            : (languagesForProduct[language] = 1);
                    });
                }
            });
        }
    });
    return { languages, products };
};
