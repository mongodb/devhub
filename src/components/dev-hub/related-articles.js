import React from 'react';
import dlv from 'dlv';
import styled from '@emotion/styled';
import ARTICLE_PLACEHOLDER from '../../images/1x/MDB-and-Node.js.png';
import Card from './card';
import { H4 } from './text';
import { colorMap, screenSize, size } from './theme';

const MAX_CARD_WIDTH = 270;

const RelatedContainer = styled('div')`
    background-color: ${colorMap.devBlack};
    padding: 30px;
    @media ${screenSize.mediumAndUp} {
        padding: 70px ${size.xxlarge};
    }
`;

const RelatedCards = styled('div')`
    display: flex;
    @media ${screenSize.upToMedium} {
        flex-direction: column;
        > a,
        > div {
            margin: 0 auto;
        }
    }
    @media ${screenSize.mediumAndUp} {
        > a,
        > div {
            padding-left: 0;
            padding-right: 0;
            margin-left: ${size.medium};
            margin-right: ${size.medium};
        }
        > :first-child {
            margin-left: 0;
        }
        > :last-child {
            margin-right: 0;
        }
    }
`;

const RelatedArticles = ({ related, slugTitleMapping }) => {
    if (!related || !related.length) return null;
    return (
        <RelatedContainer>
            <H4>Related</H4>
            <RelatedCards>
                {related.map(r => {
                    const target = r.target;
                    const slug = r.target && r.target.slice(1, r.target.length);
                    const image = r.image || ARTICLE_PLACEHOLDER;
                    const title = dlv(slugTitleMapping, [slug, 0, 'value'], '');
                    if (title === '') {
                        console.error(
                            `No title found for this article ${slug}`,
                            slugTitleMapping
                        );
                    }
                    /* TODO: Case on doc to link internal vs external */
                    return (
                        <Card
                            image={image}
                            href={target}
                            maxDescriptionLines={2}
                            title={title}
                            maxWidth={MAX_CARD_WIDTH}
                        />
                    );
                })}
            </RelatedCards>
        </RelatedContainer>
    );
};

export default RelatedArticles;
