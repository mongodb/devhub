export const aggregateItemsWithTagType = (
    allArticles,
    type,
    isPlural = false
) =>
    allArticles.reduce((acc, current) => {
        const addItemToAcc = v => {
            if (acc[v]) {
                acc[v].push(current);
            } else {
                acc[v] = [current];
            }
        };
        if (isPlural) {
            current[type].forEach(({ label }) => {
                addItemToAcc(label);
            });
        } else {
            addItemToAcc(current[type]);
        }
        return acc;
    }, {});
