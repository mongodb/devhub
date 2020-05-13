const { DOCUMENTS_COLLECTION } = require('../../build-constants');
const { constructDbFilter } = require('./construct-db-filter');

const stitchFetchDocuments = metadata => {
    const PAGE_ID_PREFIX = `${metadata.project}/${metadata.user}/${metadata.parserBranch}`;

    return {
        name: 'fetchDocuments',
        args: [
            metadata.database,
            DOCUMENTS_COLLECTION,
            constructDbFilter(PAGE_ID_PREFIX),
        ],
        resultType: 'StitchArticle',
        getResultId: x => x.page_id,
    };
};

module.exports = { stitchFetchDocuments };
