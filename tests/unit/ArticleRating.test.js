import React from 'react';
import { shallow } from 'enzyme';

import ArticleRating from '~components/ArticleRating';
import MockArticleRatingProvider from './mock/MockArticleRatingProvider';

describe('ArticleRating', () => {
    it('renders bottom variant correctly', () => {
        expect(
            shallow(
                <MockArticleRatingProvider>
                    <ArticleRating isBottom />
                </MockArticleRatingProvider>
            )
        ).toMatchSnapshot();
    });

    it('renders top variant correctly', () => {
        expect(
            shallow(
                <MockArticleRatingProvider>
                    <ArticleRating isTop />
                </MockArticleRatingProvider>
            )
        ).toMatchSnapshot();
    });
});
