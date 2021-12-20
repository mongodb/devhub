export const getISODate = date =>
    date && new Date(date).toISOString().slice(0, 10);
