import React, { useState } from 'react';
import styled from '@emotion/styled';
import Card from './card';
import Button from './button';
import { screenSize, size } from './theme';

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
    console.log(items);
    return (
        <>
            <CardContainer>
                {items.slice(0, visibleCards).map(item => (
                    <ArticleCard
                        key={item['_id']}
                        image={item['atf-image']}
                        tags={[...item.languages, ...item.products]}
                    >
                        {item['meta-description'][0].children[0].value}
                    </ArticleCard>
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
