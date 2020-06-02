export const removePageIfStaged = (page, deletePage, stagingPages) => {
    if (
        process.env.SNOOTY_ENV === 'production' &&
        stagingPages.includes(page.path)
    ) {
        deletePage(page);
    }
};
