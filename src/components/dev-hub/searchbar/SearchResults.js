import React, { useCallback, useEffect, useMemo } from 'react';
import styled from '@emotion/styled';
import { fontSize, screenSize, size } from '~components/dev-hub/theme';
import SearchResult from './SearchResult';
import { reportAnalytics } from '~utils/report-analytics';

const SEARCHBAR_HEIGHT = '36px';
const SEARCH_RESULT_HEIGHT = '102px';
const SEARCH_RESULT_MOBILE_HEIGHT = '136px';

const StyledResultText = styled('p')`
    font-family: Akzidenz;
    font-size: ${fontSize.small};
    letter-spacing: 0.5px;
    margin: 0;
    padding-left: ${size.medium};
`;

const SearchResultsContainer = styled('div')`
    align-items: center;
    background-color: ${({ theme }) => theme.colorMap.pageBackground};
    display: grid;
    grid-template-columns: 100%;
    grid-template-rows: ${({ hasResults }) =>
        hasResults
            ? `${size.medium} ${SEARCH_RESULT_HEIGHT} ${SEARCH_RESULT_HEIGHT} ${SEARCH_RESULT_HEIGHT}`
            : `${size.medium} ${size.large}`};
    position: relative;
    /* Give top padding on desktop to offset this extending into the searchbar */
    padding-top: 36px;
    width: 100%;
    @media ${screenSize.upToSmall} {
        background-color: ${({ theme }) => theme.colorMap.pageBackground};
        box-shadow: none;
        grid-template-rows: ${size.medium};
        grid-auto-rows: ${SEARCH_RESULT_MOBILE_HEIGHT};
        /* On mobile, let the dropdown take the available height */
        height: calc(100% - ${SEARCHBAR_HEIGHT});
        padding-top: ${size.default};
        overflow-y: scroll;
    }
`;

const StyledSearchResult = styled(SearchResult)`
    border-bottom: 1px solid ${({ theme }) => theme.colorMap.greyDarkTwo};
    max-height: 100%;
    height: 100%;
    > div {
        padding: ${size.default} ${size.medium};
    }
    @media ${screenSize.upToSmall} {
        background-color: ${({ theme }) => theme.colorMap.greyDarkThree};
        border: 1px solid ${({ theme }) => theme.colorMap.greyDarkTwo};
        border-radius: ${size.tiny};
        height: calc(100% - ${size.default});
        /* place-self adds both align-self and justify-self for flexbox */
        place-self: center;
        width: calc(100% - ${size.large});
        > div {
            padding: ${size.default};
        }
    }
`;

const SearchResults = ({
    currentPage,
    totalResultsCount,
    visibleResults,
    ...props
}) => {
    const hasResults = useMemo(() => !!totalResultsCount, [totalResultsCount]);
    const getRankFromPage = useCallback(
        index => (currentPage - 1) * index + 1,
        [currentPage]
    );
    useEffect(() => {
        // This effect prevents scrolling outside the opened nav
        // We restore normal scrolling when the nav is closed
        document.body.style.overflow = 'hidden';
        return () => (document.body.style.overflow = 'auto');
    }, []);
    return (
        <SearchResultsContainer hasResults={hasResults} {...props}>
            <StyledResultText>
                <strong>Most Relevant Results ({totalResultsCount})</strong>
            </StyledResultText>
            {hasResults ? (
                visibleResults.map(
                    ({ title, description: preview, slug }, index) => (
                        <StyledSearchResult
                            // Have to use index because multiple results can show with same url
                            key={`${slug}${index}`}
                            onClick={() =>
                                reportAnalytics('SearchSelection', {
                                    areaFrom: 'Searchbar',
                                    rank: getRankFromPage(index),
                                    selectionUrl: slug,
                                })
                            }
                            title={title[0].value}
                            preview={preview}
                            url={slug}
                        />
                    )
                )
            ) : (
                <StyledResultText>There are no search results</StyledResultText>
            )}
        </SearchResultsContainer>
    );
};

export default SearchResults;
