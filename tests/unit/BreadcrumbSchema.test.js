import React from 'react';
import { shallow } from 'enzyme';
import BreadcrumbSchema from '../../src/components/dev-hub/breadcrumb-schema';

import mockData from './data/BreadcrumbSchema.test.json';

const siteUrl = 'https://developer.mongodb.com';

jest.mock('../../src/hooks/use-site-metadata', () => ({
    useSiteMetadata: () => ({ siteUrl })
}));

describe('BreadcrumbSchema', () => {
    let shallowWrapper;

    beforeAll(() => {
        shallowWrapper = shallow(<BreadcrumbSchema breadcrumb={mockData} />);
    });

    it('renders correctly', () => {
        console.log(shallowWrapper);
        expect(shallowWrapper).toMatchSnapshot();
    });

    it('script has a correct schema', () => {
        const script = shallowWrapper.find('script');
        
        expect(script.text()).toEqual(JSON.stringify(
            {
                "@context": "https://schema.org",
                "@type": "BreadcrumbList",
                itemListElement: [
                    { "@type": "ListItem", "position": 1, name: "Home", item: siteUrl }, 
                    { "@type": "ListItem", "position": 2, name: "Learn", item: siteUrl + "/learn/" }]
            }
        ));
    });
})
