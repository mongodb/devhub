import React, { useCallback, useMemo } from 'react';
import styled from '@emotion/styled';
import IconButton from '@leafygreen-ui/icon-button';
import Icon from '@leafygreen-ui/icon';
import { colorMap, size } from '~components/dev-hub/theme';

// 16px for the icon + 2px padding on each side for hover circle
const BUTTON_WIDTH = `${size.stripUnit(size.default) + 4}px`;
const ENABLED_COLOR = colorMap.greyLightOne;
const DISABLED_COLOR = colorMap.greyDarkOne;

const PaginationButton = styled(IconButton)`
    background-color: ${({ theme }) => theme.colorMap.pageBackground};
    height: ${BUTTON_WIDTH};
    padding: 0;
    width: ${BUTTON_WIDTH};
    z-index: 1;
    &:active,
    &:hover,
    &:focus {
        :before {
            content: none;
        }
    }
`;

const PaginationIcon = styled(Icon)`
    &:active,
    &:hover,
    &:focus {
        color: ${({ theme }) => theme.colorMap.devWhite};
    }
`;

const PaginationContainer = styled('div')`
    align-items: center;
    display: flex;
`;

const PaginationText = styled('p')`
    font-size: ${size.default};
    margin: 0 ${size.tiny};
`;

const Pagination = ({ currentPage, setCurrentPage, totalPages }) => {
    const decrementPage = useCallback(() => {
        if (currentPage !== 1) setCurrentPage(currentPage - 1);
    }, [currentPage, setCurrentPage]);
    const incrementPage = useCallback(() => {
        if (currentPage !== totalPages) setCurrentPage(currentPage + 1);
    }, [currentPage, setCurrentPage, totalPages]);
    const canDecrementPage = useMemo(() => currentPage !== 1, [currentPage]);
    const canIncrementPage = useMemo(() => currentPage < totalPages, [
        currentPage,
        totalPages,
    ]);
    return (
        <PaginationContainer>
            <PaginationButton
                aria-label="Back Page"
                data-test="Back Search Page"
                disabled={!canDecrementPage}
                onClick={decrementPage}
                title="Back Page"
            >
                <PaginationIcon
                    glyph="ChevronLeft"
                    fill={canDecrementPage ? ENABLED_COLOR : DISABLED_COLOR}
                />
            </PaginationButton>
            <PaginationText data-test="Search Page Text">
                <strong>
                    {currentPage}/{totalPages}
                </strong>
            </PaginationText>
            <PaginationButton
                aria-label="Forward Page"
                data-test="Forward Search Page"
                disabled={!canIncrementPage}
                onClick={incrementPage}
                title="Forward Page"
            >
                <PaginationIcon
                    glyph="ChevronRight"
                    fill={canIncrementPage ? ENABLED_COLOR : DISABLED_COLOR}
                />
            </PaginationButton>
        </PaginationContainer>
    );
};

export default Pagination;
