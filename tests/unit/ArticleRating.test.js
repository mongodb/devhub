import React from 'react';
import { shallow } from 'enzyme';

import ArticleRating from '~components/ArticleRating';

describe('ArticleRating', () => {
    it('renders bottom variant correctly', () => {
        expect(shallow(<ArticleRating isBottom />)).toMatchSnapshot();
    });

    it('renders top variant correctly', () => {
        expect(shallow(<ArticleRating isTop />)).toMatchSnapshot();
    });
});
