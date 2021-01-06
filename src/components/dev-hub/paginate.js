import React, { useEffect, useMemo, useState } from 'react';
import styled from '@emotion/styled';
import { useLocation } from '@reach/router';
import { buildQueryString, parseQueryString } from '~utils/query-string';
import Button from './button';
import { screenSize, size } from './theme';

const CardContainer = styled('div')`
    display: grid;
    grid-template-columns: repeat(auto-fill, 350px);
    grid-row-gap: ${size.small};
    justify-content: center;
    margin: 0 -${size.medium};

    @media ${screenSize.upToMedium} {
        display: block;
    }
`;

const HasMoreButtonContainer = styled('div')`
    margin-bottom: ${size.large};
    margin-top: ${size.large};
    text-align: center;
`;

const Paginate = ({ children, limit, ...props }) => {
    const { pathname, search } = useLocation();
    const localPage = pathname.replace(__PATH_PREFIX__, '');
    // Build next link, preserving other links
    const nextPageLink = useMemo(() => {
        // Get page if exists from search
        const { page = 1, ...params } = parseQueryString(search);
        // Have to parseInt because string + number gives a string
        const pageNumber = parseInt(page) + 1;
        return localPage + buildQueryString({ page: pageNumber, ...params });
    }, [localPage, search]);

    useEffect(() => {
        const { page = 1 } = parseQueryString(search);
        setVisibleCards(page * limit);
    }, [limit, search]);

    const { page = 1 } = parseQueryString(search);
    const [visibleCards, setVisibleCards] = useState(page * limit);

    const hasMore = children.length > visibleCards;
    const visibleElements = useMemo(() => children.slice(0, visibleCards), [
        children,
        visibleCards,
    ]);

    return (
        <div {...props}>
            <CardContainer>{visibleElements}</CardContainer>
            {hasMore && (
                <HasMoreButtonContainer>
                    <Button secondary pagination to={nextPageLink}>
                        Load more
                    </Button>
                </HasMoreButtonContainer>
            )}
        </div>
    );
};

export default Paginate;
