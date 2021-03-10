import React, { useCallback, useContext, useMemo, useRef } from 'react';
import { css } from '@emotion/core';
import styled from '@emotion/styled';
import { useTheme } from 'emotion-theming';
import { useEventListener } from '@leafygreen-ui/hooks';
import Icon from '@leafygreen-ui/icon';
import IconButton from '@leafygreen-ui/icon-button';
import useMedia from '~hooks/use-media';
import { screenSize, size } from '~components/dev-hub/theme';
import SearchTextInput from './SearchTextInput';
import { SearchResultLink } from './SearchResult';
import SearchContext from './SearchContext';

const ARROW_DOWN_KEY = 40;
const CLOSE_BUTTON_SIZE = size.default;
const ENTER_KEY = 13;
const GO_BUTTON_COLOR = '#FFFFFF';
const GO_BUTTON_SIZE = size.default;

const removeDefaultHoverEffects = css`
    background-image: none;
    border: none;
    box-shadow: none;
    :before {
        display: none;
    }
    :after {
        display: none;
    }
`;

const CloseButton = styled(IconButton)`
    background-color: none;
    border-radius: ${CLOSE_BUTTON_SIZE};
    height: ${CLOSE_BUTTON_SIZE};
    position: absolute;
    right: 10px;
    /* button is 16px and entire container is 36px so 8px top gives equal spacing */
    top: 10px;
    width: ${CLOSE_BUTTON_SIZE};
    z-index: 1;
    ${removeDefaultHoverEffects};
`;

const GoButton = styled(IconButton)`
    background-color: ${GO_BUTTON_COLOR};
    border-radius: ${GO_BUTTON_SIZE};
    height: ${GO_BUTTON_SIZE};
    padding: 0;
    position: absolute;
    right: ${size.default};
    /* button is 16 px and entire container is 36px so 10px top gives equal spacing */
    top: 10px;
    width: ${GO_BUTTON_SIZE};
    z-index: 1;
`;

const GoIcon = styled(Icon)`
    /* Icon box size is 16px, 4px gives equal width and height */
    left: 4px;
    top: 4px;
    height: 8px;
    position: absolute;
    width: 8px;
`;

const MagnifyingGlass = styled(Icon)`
    color: ${({ theme }) => theme.colorMap.greyDarkTwo};
    transition: color 150ms ease-in;
`;

const MagnifyingGlassButton = styled(IconButton)`
    height: ${size.default};
    width: ${size.default};
    left: 10px;
    padding: 0;
    position: absolute;
    /* This button is 16px tall in a 36px tall container, so 10px gives equal spacing */
    top: 10px;
    z-index: 1;
    /* Remove hover state */
    :before {
        display: none;
    }
    :after {
        display: none;
    }
`;

const ExpandedSearchbar = ({ isFocused, onChange, onMobileClose }) => {
    const theme = useTheme();
    const isMobile = useMedia(screenSize.upToSmall);
    const { searchContainerRef, searchTerm } = useContext(SearchContext);
    const isSearching = useMemo(() => !!searchTerm && isFocused, [
        isFocused,
        searchTerm,
    ]);
    const shouldShowGoButton = useMemo(() => !!searchTerm && !isMobile, [
        isMobile,
        searchTerm,
    ]);

    const onSearchChange = useCallback(
        e => {
            const searchTerm = e.target.value;
            onChange(searchTerm);
        },
        [onChange]
    );

    const onSearchFocus = useCallback(() => {
        if (searchTextbox && searchTextbox.current) {
            searchTextbox.current.focus();
        }
    }, []);

    const goButton = useRef(null);
    const searchTextbox = useRef(null);

    const onKeyDown = useCallback(
        e => {
            // On an "Enter", click the Go button
            if (e.key === 'Enter' || e.keyCode === ENTER_KEY) {
                goButton && goButton.current && goButton.current.click();
            } else if (e.key === 'ArrowDown' || e.keyCode === ARROW_DOWN_KEY) {
                // prevent scrolldown
                e.preventDefault();
                // find first result in the dropdown and focus
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

    useEventListener('keydown', onKeyDown, {
        dependencies: [searchTextbox.current],
        element: searchTextbox.current,
    });

    const searchUrl = useMemo(() => `/learn/?text=${searchTerm}#main`, [
        searchTerm,
    ]);

    return (
        <span data-test="Expanded Searchbar">
            <MagnifyingGlassButton
                aria-label="Search MongoDB Developer Hub"
                onClick={onSearchFocus}
            >
                <MagnifyingGlass glyph="MagnifyingGlass" />
            </MagnifyingGlassButton>
            <SearchTextInput
                ref={searchTextbox}
                isSearching={isSearching}
                onChange={onSearchChange}
                value={searchTerm}
            />
            {shouldShowGoButton && (
                <GoButton
                    ref={goButton}
                    type="submit"
                    aria-label="Go"
                    href={searchUrl}
                >
                    <GoIcon
                        glyph="ArrowRight"
                        fill={theme.colorMap.pageBackground}
                    />
                </GoButton>
            )}
            {isMobile && (
                <CloseButton onClick={onMobileClose}>
                    <Icon glyph="X" />
                </CloseButton>
            )}
        </span>
    );
};

// Export this icon to be used as a selector by a parent component
export { MagnifyingGlass };
export default ExpandedSearchbar;
