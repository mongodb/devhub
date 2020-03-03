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

const getCardParamsFromRelatedType = (relatedArticle, slugTitleMapping) => {
    const name = relatedArticle.name
        ? relatedArticle.name
        : relatedArticle.type;
    switch (name) {
        case 'doc':
            const target = relatedArticle.target;
            const slug = target && target.slice(1, target.length);
            const image = relatedArticle.image || ARTICLE_PLACEHOLDER;
            const title = dlv(slugTitleMapping, [slug, 0, 'value'], '');
            if (title === '') {
                console.error(
                    `No title found for this internal article ${slug}`,
                    slugTitleMapping
                );
            }
            return { image, target, title };
        case 'literal':
            return {
                image: ARTICLE_PLACEHOLDER,
                target: null,
                title: dlv(relatedArticle, ['children', 0, 'value'], ''),
            };
        case 'reference':
            return {
                image: ARTICLE_PLACEHOLDER,
                target: relatedArticle.refuri,
                title: dlv(relatedArticle, ['children', 0, 'value'], ''),
            };
        default:
            console.error(`Related article type not implemented: ${name}`);
            return { title: null, image: null, target: null };
    }
};

const RelatedArticles = ({ related, slugTitleMapping }) => {
    if (!related || !related.length) return null;
    return (
        <RelatedContainer>
            <H4>Related</H4>
            <RelatedCards>
                {related.map((r, i) => {
                    const {
                        image,
                        target,
                        title,
                    } = getCardParamsFromRelatedType(r, slugTitleMapping);

                    /* TODO: Case on doc to link internal vs external */
                    return (
                        <Card
                            // Title may be undefined, so tacking on index keeps unique
                            key={`${title}-${i}`}
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
