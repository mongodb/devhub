import React, { useCallback, useContext, useRef } from 'react';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { fontSize, screenSize, size } from '~components/dev-hub/theme';
import Link from '~components/Link';
import { getNestedValue } from '~utils/get-nested-value';
import SearchContext from './SearchContext';
import { StyledTextInput } from './SearchTextInput';
import Badge from './../badge';

const ABOVE_MOBILE = screenSize.smallAndUp;
const ARROW_DOWN_KEY = 40;
const ARROW_UP_KEY = 38;
const LINK_COLOR = '#494747';

const largeResultTitle = css`
    font-size: ${size.default};
    line-height: ${size.mediumLarge};
    /* Only add bold on larger devices */
    @media ${screenSize.smallAndUp} {
        font-weight: bolder;
    }
`;

// Truncates text to a maximum number of lines
const truncate = maxLines => css`
    display: -webkit-box;
    -webkit-line-clamp: ${maxLines}; /* supported cross browser */
    -webkit-box-orient: vertical;
    overflow: hidden;
`;

const SearchResultContainer = styled('div')`
    height: 100%;
    @media ${screenSize.upToSmall} {
        display: flex;
        flex-direction: column;
        height: 100%;
    }
`;

const SearchResultLink = styled(Link)`
    color: ${LINK_COLOR};
    height: 100%;
    text-decoration: none;
    background-color: ${({ theme }) => theme.colorMap.pageBackground};
    @media ${ABOVE_MOBILE} {
        :hover,
        :focus {
            color: ${LINK_COLOR};
            text-decoration: none;
            ${SearchResultContainer} {
                background-color: ${({ theme }) =>
                    theme.colorMap.greyDarkThree};
                transition: background-color 150ms ease-in;
            }
        }
    }
`;

const StyledPreviewText = styled('p')`
    color: ${({ theme }) => theme.colorMap.greyLightTwo};
    font-family: Akzidenz;
    font-size: ${fontSize.small};
    letter-spacing: 0.5px;
    line-height: ${size.mediumLarge};
    margin-bottom: 0;
    margin-top: 0;
    ${({ maxLines }) => truncate(maxLines)};
`;

const StyledResultTitle = styled('p')`
    color: ${({ theme }) => theme.colorMap.devWhite};
    font-family: Akzidenz;
    font-size: ${fontSize.small};
    line-height: ${size.mediumLarge};
    letter-spacing: 0.5px;
    margin-bottom: ${size.xsmall};
    margin-top: 0;
    ${truncate(1)};
    ${({ useLargeTitle }) => useLargeTitle && largeResultTitle};
    @media ${screenSize.upToSmall} {
        ${largeResultTitle};
        ${truncate(2)};
    }
`;

const StyledBadge = styled(Badge)`
    margin: 0px 0px ${size.xsmall} 0px;
    position: static;
    color: white;
    max-width: fit-content;
`;

const SearchResult = React.memo(
    ({
        maxLines = 2,
        useLargeTitle = false,
        onClick,
        preview,
        title,
        url,
        badge,
        ...props
    }) => {
        const { searchContainerRef } = useContext(SearchContext);
        const resultLinkRef = useRef(null);

        const onArrowDown = useCallback(
            resultLinkRef => {
                const nextSibling = getNestedValue(
                    ['current', 'nextSibling'],
                    resultLinkRef
                );
                if (nextSibling) {
                    nextSibling.focus();
                } else {
                    // This is the last result, so let's loop back to the top
                    if (searchContainerRef && searchContainerRef.current) {
                        const firstLink = searchContainerRef.current.querySelector(
                            `${SearchResultLink}`
                        );
                        if (firstLink) {
                            firstLink.focus();
                        }
                    }
                }
            },
            [searchContainerRef]
        );

        const onArrowUp = resultLinkRef => {
            const prevSibling = getNestedValue(
                ['current', 'previousSibling'],
                resultLinkRef
            );
            if (prevSibling) {
                // If these don't match, we have gone up out of the results
                if (prevSibling.nodeName !== resultLinkRef.current.nodeName) {
                    // This is the first result, so let's go to the search bar
                    document.querySelector(`${StyledTextInput} input`).focus();
                } else {
                    prevSibling.focus();
                }
            }
        };
        // Navigate with arrow keys
        const onKeyDown = useCallback(
            e => {
                // Only allow arrow keys if we are within the searchbar (not if this is being reused)
                if (searchContainerRef) {
                    if (e.key === 'ArrowDown' || e.keyCode === ARROW_DOWN_KEY) {
                        e.preventDefault();
                        // find next result and focus

                        onArrowDown(resultLinkRef);
                    } else if (
                        e.key === 'ArrowUp' ||
                        e.keyCode === ARROW_UP_KEY
                    ) {
                        e.preventDefault();
                        // find previous result and focus
                        onArrowUp(resultLinkRef);
                    }
                }
            },
            [onArrowDown, searchContainerRef]
        );
        return (
            <SearchResultLink
                data-test="Search Result"
                ref={resultLinkRef}
                to={url}
                onClick={onClick}
                onKeyDown={onKeyDown}
                {...props}
            >
                <SearchResultContainer>
                    {badge && <StyledBadge contentType={badge} />}
                    <StyledResultTitle useLargeTitle={useLargeTitle}>
                        {title}
                    </StyledResultTitle>
                    <StyledPreviewText maxLines={maxLines}>
                        {preview}
                    </StyledPreviewText>
                </SearchResultContainer>
            </SearchResultLink>
        );
    }
);

export { SearchResultLink };
export default SearchResult;
