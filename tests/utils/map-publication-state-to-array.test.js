import { mapPublicationStateToArray } from '../../src/utils/setup/map-publication-state-to-array';

it('should identify when a new page is being navigated to', () => {
    const OLD_ENV = process.env;
    jest.resetModules();
    process.env = { ...OLD_ENV };

    const STRAPI_PUBLICATION_STATE = 'foo';
    process.env.STRAPI_PUBLICATION_STATE = STRAPI_PUBLICATION_STATE;

    const entries = ['article', 'project'];
    const expectedEntries = [
        {
            name: 'article',
            api: { qs: { _publicationState: STRAPI_PUBLICATION_STATE } },
        },
        {
            name: 'project',
            api: { qs: { _publicationState: STRAPI_PUBLICATION_STATE } },
        },
    ];

    expect(mapPublicationStateToArray(entries)).toStrictEqual(expectedEntries);

    process.env = OLD_ENV;
});
