import React from 'react';
import dlv from 'dlv';
import styled from '@emotion/styled';
import ARTICLE_PLACEHOLDER from '../../images/1x/MDB-and-Node.js.png';
import Card from './card';
import { H4 } from './text';
import { colorMap, screenSize } from './theme';

const RelatedContainer = styled('div')`
    background-color: ${colorMap.devBlack};
    padding: 70px 120px;
    @media ${screenSize.mediumAndUp} {
        height: 575px;
    }
`;

const RelatedCards = styled('div')`
    display: flex;
    @media ${screenSize.upToMedium} {
        flex-direction: column;
    }
    @media ${screenSize.mediumAndUp} {
        > a {
            padding-left: 0;
            padding-right: 0;
            margin-left: 20px;
            margin-right: 20px;
        }
        > a:first-of-type {
            margin-left: 0;
        }
        > a:last-of-type {
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
                            // maxWidth={260}
                        />
                    );
                })}
            </RelatedCards>
        </RelatedContainer>
    );
};

export default RelatedArticles;
