const getTagPageUriComponent = tagPageUri =>
    tagPageUri.toLowerCase().replace(/\W/g, '-');

// TODO: Investigate using ES6 exports with Gatsby
module.exports.getTagPageUriComponent = getTagPageUriComponent;
