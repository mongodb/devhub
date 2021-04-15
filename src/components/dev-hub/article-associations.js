import React from 'react';
import dlv from 'dlv';
import { withPrefix } from 'gatsby';
import styled from '@emotion/styled';
import ARTICLE_PLACEHOLDER from '../../images/1x/MDB-and-Node.js.png';
import { H4 } from './text';
import { screenSize, size } from './theme';
import AssociationsCard from './associations-card';

const RelatedContainer = styled('div')`
    background-color: ${({ theme }) => theme.colorMap.devBlack};
    padding: 30px ${size.medium};
    @media ${screenSize.mediumAndUp} {
        padding: 70px calc(${size.xxlarge} - ${size.medium});
    }
`;

const RelatedCards = styled('div')`
    display: grid;
    grid-auto-rows: 112px;
    grid-template-columns: repeat(auto-fill, 384px);
    column-gap: 16px;
    row-gap: 16px;
`;

const getCardParamsFromRelatedType = (
    { target: associatedLink, image },
    slugTitleMapping
) => {
    const isExternal = /^http(s)?:\/\//.test(associatedLink);
    if (isExternal) {
        // Can't add much since we just have links here
        return {
            image: ARTICLE_PLACEHOLDER,
            href: associatedLink,
            title: associatedLink,
        };
    }
    const title = dlv(
        slugTitleMapping,
        [associatedLink.slice(1, -1), 0, 'value'],
        ''
    );
    return { image: withPrefix(image), title, to: associatedLink };
};

const ArticleAssociations = ({ associations, slugTitleMapping }) => {
    if (!associations || !associations.length) return null;
    return (
        <RelatedContainer>
            <H4>Recommended for you</H4>
            <RelatedCards>
                {associations.map((link, i) => {
                    console.log(link);
                    const {
                        image,
                        href,
                        to,
                        title,
                    } = getCardParamsFromRelatedType(link, slugTitleMapping);
                    /* TODO: Case on doc to link internal vs external */
                    return (
                        <>
                            <AssociationsCard
                                // Title may be undefined, so tacking on index keeps unique
                                key={`${title}-${i}`}
                                image={image}
                                href={href}
                                title={title}
                                to={to}
                                timeToRead={link.timeToRead}
                                maxWidth={'400px'}
                            />
                        </>
                    );
                })}
            </RelatedCards>
        </RelatedContainer>
    );
};

export default ArticleAssociations;
