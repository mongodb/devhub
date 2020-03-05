import React, { useState } from 'react';
import styled from '@emotion/styled';
import Card from './card';
import Button from './button';
import { screenSize, size } from './theme';
import { withPrefix } from 'gatsby';
import { getNestedText } from '../../utils/get-nested-text';
import { getTagLinksFromMeta } from '../../utils/get-tag-links-from-meta';

const CardContainer = styled('div')`
    display: grid;
    grid-template-columns: repeat(auto-fill, 350px);
    grid-auto-rows: 1fr;
    grid-column-gap: ${size.small};
    grid-row-gap: ${size.small};
    justify-content: center;
    margin: 0 -${size.medium};

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
