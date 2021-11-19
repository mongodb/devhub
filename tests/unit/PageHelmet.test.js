import React from 'react';
import { shallow } from 'enzyme';
import PageHelmet from '~components/dev-hub/page-helmet';

const siteUrl = 'https://developer.mongodb.com';
const title = 'Standard title';

jest.mock('../../src/hooks/use-site-metadata', () => ({
    useSiteMetadata: () => ({ siteUrl, title }),
}));

describe('PageHelmet', () => {
    it('renders standard correctly', () => {
        const tree = shallow(<PageHelmet />);
        expect(tree).toMatchSnapshot();
    });

    it('renders with custom props correctly', () => {
        const tree = shallow(
            <PageHelmet
                title="Test Title"
                pagePath="/test-url.com"
                description="test description"
                type="test prop"
            />
        );
        expect(tree).toMatchSnapshot();
    });
});
