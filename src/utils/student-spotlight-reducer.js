export const studentSpotlightReducer = (state, { field, value }) => ({
    ...state,
    [field]: value,
});
