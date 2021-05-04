export const aggregateItemsWithTagType = (
    allArticles,
    type,
    isPlural = false
) =>
    allArticles.reduce((acc, current) => {
        if (isPlural) {
            current[type].forEach(({ label }) => {
                if (acc[label]) {
                    acc[label].push(current);
                } else {
                    acc[label] = [current];
                }
            });
        } else {
            const type = current.type;
            if (acc[type]) {
                acc[type].push(current);
            } else {
                acc[type] = [current];
            }
        }
        return acc;
    }, {});
