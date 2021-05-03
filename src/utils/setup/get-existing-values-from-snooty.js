export const getExistingValuesFromSnooty = async (
    stitchClient,
    metadata,
    type,
    map
) => {
    const allSnootyValues = await stitchClient.callFunction('getValuesByKey', [
        metadata,
        type,
    ]);
    return allSnootyValues.map(map);
};
