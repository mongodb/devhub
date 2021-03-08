import React, { useEffect, useState } from 'react';
import { css, keyframes } from '@emotion/core';
import styled from '@emotion/styled';
import { uiColors } from '@leafygreen-ui/palette';
import useMedia from '~hooks/use-media';
import { screenSize, size } from '~components/dev-hub/theme';
import Pagination from './Pagination';
import SearchResults from './SearchResults';

const RESULTS_PER_PAGE = 3;
const SEARCH_FOOTER_DESKTOP_HEIGHT = size.xlarge;
const SEARCH_RESULTS_DESKTOP_HEIGHT = '368px';

const animationKeyframe = startingOpacity => keyframes`
    0% {
      opacity: ${startingOpacity};
    }
    100% {
      opacity: 1;
    }
`;

const fadeInAnimation = (startingOpacity, seconds) => css`
    animation: ${animationKeyframe(startingOpacity)};
    animation-iteration-count: 1;
    animation-timing-function: ease-in;
    animation-duration: ${seconds};
`;

const FixedHeightSearchResults = styled(SearchResults)`
    height: ${SEARCH_RESULTS_DESKTOP_HEIGHT};
`;

const SearchResultsContainer = styled('div')`
    border-radius: 0 0 ${size.tiny} ${size.tiny};
    opacity: 1;
    position: absolute;
    top: ${size.default};
    width: 100%;
    z-index: -1;
    ${fadeInAnimation(0, '0.2s')};
    @media ${screenSize.upToSmall} {
        background-color: ${uiColors.gray.light3};
        bottom: 0;
        top: 40px;
    }
`;

const SearchFooter = styled('div')`
    align-items: center;
    background-color: ${({ theme }) => theme.colorMap.pageBackground};
    display: flex;
    height: ${SEARCH_FOOTER_DESKTOP_HEIGHT};
    justify-content: space-between;
    position: relative;
    padding-left: ${size.default};
    padding-right: ${size.default};
    width: 100%;
    @media ${screenSize.upToMedium} {
        display: none;
    }
`;

const SearchDropdown = ({ results = [] }) => {
    const [visibleResults, setVisibleResults] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    // Number of filters is always 2, since branch is inferred when a product is picked
    const isMobile = useMedia(screenSize.upToMedium);
    const totalPages = results
        ? Math.ceil(results.length / RESULTS_PER_PAGE)
        : 0;
    useEffect(() => {
        if (isMobile) {
            // If mobile, we give an overflow view, so no pagination is needed
            setVisibleResults(results);
        } else {
            const start = (currentPage - 1) * RESULTS_PER_PAGE;
            const end = currentPage * RESULTS_PER_PAGE;
            setVisibleResults(results.slice(start, end));
        }
    }, [currentPage, isMobile, results]);
    return (
        <SearchResultsContainer>
            <FixedHeightSearchResults
                currentPage={currentPage}
                totalResultsCount={results.length}
                visibleResults={visibleResults}
            />
            <SearchFooter>
                <Pagination
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                    totalPages={totalPages}
                />
            </SearchFooter>
        </SearchResultsContainer>
    );
};

export default SearchDropdown;
