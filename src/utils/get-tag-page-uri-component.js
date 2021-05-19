const getTagPageUriComponent = tagPageUri => {
    switch (tagPageUri) {
        case '.NET':
            return 'dotnet';
        case 'c#':
            return 'csharp';
        default:
            return tagPageUri
                .toLowerCase()
                .replace(/\W/g, '-')
                .replace(/[-_,]+/g, '-')
    }
};

// TODO: Investigate using ES6 exports with Gatsby
module.exports.getTagPageUriComponent = getTagPageUriComponent;
