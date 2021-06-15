import { fuzzySlugMatch } from '../fuzzy-slug-match';

export const removeDuplicatedArticles = (snootyArticles, strapiArticles) => {
    // filter snooty articles where the slug matches a strapi one
    const filteredSnootyArticles = snootyArticles.filter(
        ({ slug }) => !strapiArticles.find(a => fuzzySlugMatch(a.slug, slug))
    );
    return filteredSnootyArticles.concat(strapiArticles);
};
