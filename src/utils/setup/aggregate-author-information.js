export const aggregateAuthorInformation = allArticles =>
    allArticles.reduce((acc, current) => {
        current['authors'].forEach(author => {
            const name = author.name;
            if (acc[name]) {
                acc[name]['pages'].push(current);
                acc[name]['author'] = author;
            } else {
                acc[name] = {};
                acc[name]['author'] = author;
                acc[name]['pages'] = [current];
            }
        });
        return acc;
    }, {});
