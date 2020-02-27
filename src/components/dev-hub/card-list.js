import React, { useState } from 'react';
import styled from '@emotion/styled';
import Card from './card';
import Button from './button';
import { screenSize, size } from './theme';
import { withPrefix } from 'gatsby';
import { getNestedText } from '../../utils/get-nested-text';
import { getTagLinksFromMeta } from '../../utils/get-tag-links-from-meta';

const CardContainer = styled('div')`
    align-items: center;
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    margin: 0 -${size.medium};

    @media ${screenSize.xlargeAndUp} {
        &:after {
            /* Hack to prevent last row cards from expanding */
            content: '';
            flex-grow: 1000000000;
        }
    }
    @media ${screenSize.upToMedium} {
        display: block;
    }
`;
const ArticleCard = styled(Card)`
    flex: 1 1 360px;
`;

const CenterBlock = styled('div')`
    text-align: center;
`;

export default React.memo(({ items = [], limit = 9 }) => {
    const [visibleCards, setVisibleCards] = useState(limit);
    const hasMore = items.length > visibleCards;
    return (
        <>
            <CardContainer>
                {items.slice(0, visibleCards).map(item => (
                    <ArticleCard
                        to={item['slug']}
                        key={item['_id']}
                        image={withPrefix(item['atf-image'])}
                        tags={getTagLinksFromMeta(item)}
                        title={getNestedText(item['title'])}
                        description={getNestedText(item['meta-description'])}
                    />
                ))}
            </CardContainer>
            {hasMore && (
                <CenterBlock>
                    <Button
                        secondary
                        pagination
                        onClick={() => setVisibleCards(visibleCards + limit)}
                    >
                        Load more
                    </Button>
                </CenterBlock>
            )}
        </>
    );
});
