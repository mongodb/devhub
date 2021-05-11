import React from 'react';
import { ArticleRatingProvider } from '~components/ArticleRatingContext';

const MockArticleRatingProvider = ({ children }) => (
    <ArticleRatingProvider
        value={{
            ratingState: {
                starts: [false, false, false, false, false],
                isClicked: false,
                starRatingFlow: null,
            },
        }}
    >
        {children}
    </ArticleRatingProvider>
);

export default MockArticleRatingProvider;
