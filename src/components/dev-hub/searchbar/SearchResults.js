import React, { useCallback, useContext, useEffect, useMemo } from 'react';
import styled from '@emotion/styled';
import { fontSize, screenSize, size } from '~components/dev-hub/theme';
import useMedia from '~hooks/use-media';
import SearchResult from './SearchResult';
import { reportAnalytics } from '~utils/report-analytics';
import SearchContext from './SearchContext';
import SearchLoader from './SearchLoader';
import { P } from '~components/dev-hub/text';

const SEARCHBAR_HEIGHT = '36px';
const SEARCH_RESULT_HEIGHT = '148px';
const SEARCH_RESULT_MOBILE_HEIGHT = '172px';

const StyledResultText = styled(P)`
    align-self: flex-start;
    font-family: Akzidenz;
    font-size: ${fontSize.small};
    letter-spacing: 0.5px;
    line-height: ${size.mediumLarge};
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
            ? `${size.mediumLarge} ${SEARCH_RESULT_HEIGHT} ${SEARCH_RESULT_HEIGHT} ${SEARCH_RESULT_HEIGHT}`
            : `${size.mediumLarge} 48px`};
    position: relative;
    /* Give top padding on desktop to offset this extending into the searchbar */
    padding-top: 36px;
    row-gap: ${({ hasResults }) => (hasResults ? 0 : size.small)};
    width: 100%;
    @media ${screenSize.upToSmall} {
        background-color: ${({ theme }) => theme.colorMap.pageBackground};
        box-shadow: none;
        grid-template-rows: ${({ hasResults }) =>
            hasResults
                ? size.mediumLarge
                : `${size.mediumLarge} ${size.medium}`};
        grid-auto-rows: ${SEARCH_RESULT_MOBILE_HEIGHT};
        row-gap: ${({ hasResults }) =>
            hasResults ? size.default : size.xsmall};
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
    :last-of-type {
        border-bottom: none;
    }
    @media ${screenSize.upToSmall} {
        background-color: ${({ theme }) => theme.colorMap.greyDarkThree};
        border: 1px solid ${({ theme }) => theme.colorMap.greyDarkTwo};
        border-radius: ${size.tiny};
        height: 100%;
        /* place-self adds both align-self and justify-self for flexbox */
        place-self: center;
        width: calc(100% - ${size.large});
        > div {
            padding: ${size.default};
        }
    }
`;

let scrollPosition = 0;

const SearchResults = ({
    currentPage,
    totalResultsCount,
    visibleResults,
    ...props
}) => {
    const { isLoading } = useContext(SearchContext);
    const isMobile = useMedia(screenSize.upToSmall);
    const hasResults = useMemo(() => !!totalResultsCount, [totalResultsCount]);
    const getRankFromPage = useCallback(
        index => (currentPage - 1) * index + 1,
        [currentPage]
    );
    useEffect(() => {
        // This effect prevents scrolling outside the opened search bar on mobile
        // This is a bit hacky because of the iOS keyboard behavior
        // https://blog.opendigerati.com/the-eccentric-ways-of-ios-safari-with-the-keyboard-b5aa3f34228d
        if (isMobile) {
            scrollPosition = window.pageYOffset;
            document.body.style.overflow = 'hidden';
            document.body.style.position = 'fixed';
            document.body.style.top = `-${scrollPosition}px`;
            document.body.style.width = `100%`;
            return () => {
                document.body.style.overflow = null;
                document.body.style.position = null;
                document.body.style.top = null;
                document.body.style.width = null;
                window.scrollTo(0, scrollPosition);
            };
        }
    }, [isMobile]);
    return (
        <SearchResultsContainer hasResults={hasResults} {...props}>
            {isLoading ? (
                <SearchLoader />
            ) : (
                <>
                    <StyledResultText>
                        <strong>
                            {hasResults
                                ? `Most Relevant Results (${totalResultsCount})`
                                : 'No matching results.'}
                        </strong>
                    </StyledResultText>
                    {hasResults ? (
                        visibleResults.map(
                            (
                                {
                                    title,
                                    description: preview,
                                    slug,
                                    mediaType,
                                },
                                index
                            ) => (
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
                                    badge={mediaType}
                                />
                            )
                        )
                    ) : (
                        <StyledResultText>
                            We did not find any articles matching your query,
                            please try with different search query.
                        </StyledResultText>
                    )}
                </>
            )}
        </SearchResultsContainer>
    );
};

export default SearchResults;
