import React, { useState } from 'react';
import styled from '@emotion/styled';
import Card from './card';
import Button from './button';
import { screenSize, size } from './theme';
import { withPrefix } from 'gatsby';
import { getNestedText } from '../../utils/get-nested-text';

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

export default ({ items = [], limit = 9 }) => {
    const [visibleCards, setVisibleCards] = useState(limit);
    const hasMore = items.length > visibleCards;
    return (
        <>
            <CardContainer>
                {items.slice(0, visibleCards).map(item => (
                    <ArticleCard
                        key={item['_id']}
                        image={withPrefix(item['atf-image'])}
                        tags={[
                            ...item.tags,
                            ...item.languages,
                            ...item.products,
                        ]}
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
};
