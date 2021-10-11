import React from 'react';
import { shallow } from 'enzyme';
import ArticleSchema from '../../src/components/dev-hub/article-schema';

import mockData from './data/ArticleSchema.test.json';

describe('ArticleSchema', () => {
    let shallowWrapper;

    beforeAll(() => {
        shallowWrapper = shallow(<ArticleSchema {...mockData} />);
    });

    it('script has a correct schema', () => {
        const script = shallowWrapper.find('script');

        expect(script.text()).toEqual(
            JSON.stringify({
                '@context': 'https://schema.org',
                '@type': 'BlogPosting',
                url: mockData.articleUrl,
                headline: mockData.title,
                description: mockData.description,
                datePublished: mockData.publishedDate,
                dateModified: mockData.modifiedDate,
                mainEntityOfPage: {
                    '@type': 'WebPage',
                    url: mockData.articleUrl,
                },
                image: {
                    '@type': 'imageObject',
                    url: mockData.imageUrl,
                },
                publisher: {
                    '@type': 'Organization',
                    name: 'MongoDB',
                    logo: {
                        '@type': 'imageObject',
                        url: 'https://webassets.mongodb.com/_com_assets/cms/mongodb_logo1-76twgcu2dm.png',
                    },
                },
                author: [
                    {
                        '@type': 'Person',
                        name: mockData.authors[0].name,
                    },
                ],
                tags: ['atlas', 'mongodb'],
                inLanguage: 'English',
            })
        );

        expect(shallowWrapper).toMatchSnapshot();
    });

    it('script has a correct schema without modified date', () => {
        shallowWrapper = shallow(
            <ArticleSchema
                {...mockData}
                modifiedDate={undefined}
                language="Test"
            />
        );
        const script = shallowWrapper.find('script');

        expect(script.text()).toEqual(
            JSON.stringify({
                '@context': 'https://schema.org',
                '@type': 'BlogPosting',
                url: mockData.articleUrl,
                headline: mockData.title,
                description: mockData.description,
                datePublished: mockData.publishedDate,
                dateModified: mockData.publishedDate,
                mainEntityOfPage: {
                    '@type': 'WebPage',
                    url: mockData.articleUrl,
                },
                image: {
                    '@type': 'imageObject',
                    url: mockData.imageUrl,
                },
                publisher: {
                    '@type': 'Organization',
                    name: 'MongoDB',
                    logo: {
                        '@type': 'imageObject',
                        url: 'https://webassets.mongodb.com/_com_assets/cms/mongodb_logo1-76twgcu2dm.png',
                    },
                },
                author: [
                    {
                        '@type': 'Person',
                        name: mockData.authors[0].name,
                    },
                ],
                tags: ['atlas', 'mongodb'],
                inLanguage: 'Test',
            })
        );

        expect(shallowWrapper).toMatchSnapshot();
    });
});
