import React, {
    useCallback,
    useEffect,
    useMemo,
    useState,
    useRef,
} from 'react';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { useEventListener } from '@leafygreen-ui/hooks';
import CondensedSearchbar from './CondensedSearchbar';
import ExpandedSearchbar, {
    GoButton,
    MagnifyingGlass,
} from './ExpandedSearchbar';
import SearchContext from './SearchContext';
import { activeTextBarStyling, StyledTextInput } from './SearchTextInput';
import { useClickOutside } from '~hooks/use-click-outside';
import useMedia from '~hooks/use-media';
import { layer, screenSize, size } from '~components/dev-hub/theme';
import { requestTextFilterResults } from '~utils/devhub-api-stitch';
import { reportAnalytics } from '~utils/report-analytics';
import SearchDropdown from './SearchDropdown';

const BUTTON_SIZE = '20px';
const NUMBER_SEARCH_RESULTS = 9;
const REPORT_SEARCH_DELAY_TIME = 1000;
const SEARCH_DELAY_TIME = 200;
const SEARCHBAR_DESKTOP_WIDTH = '372px';
const SEARCHBAR_HEIGHT = '36px';
const TRANSITION_SPEED = '150ms';
const SLASH_KEY = 47;

const focusedInputStyling = theme => css`
    ${StyledTextInput} {
        div > input {
            ${activeTextBarStyling}
            border: 1px solid ${theme.colorMap.greyDarkTwo};
            transition: background-color ${TRANSITION_SPEED} ease-in,
                color ${TRANSITION_SPEED} ease-in;
            @media ${screenSize.upToSmall} {
                border: none;
                box-shadow: none;
            }
        }
    }
`;

const activeInputStyling = theme => css`
    ${focusedInputStyling};
    ${StyledTextInput} {
        div > input {
            border: 1px solid ${theme.colorMap.greyDarkOne};
            @media ${screenSize.upToSmall} {
                border: none;
                box-shadow: none;
            }
        }
    }
`;

const SearchbarContainer = styled('div')`
    bottom: 0;
    margin: auto;
    height: ${({ isExpanded }) =>
        isExpanded ? SEARCHBAR_HEIGHT : BUTTON_SIZE};
    position: ${({ isExpanded }) => (isExpanded ? 'absolute' : 'relative')};
    top: 0;
    right: 0;
    width: ${({ isExpanded }) =>
        isExpanded ? SEARCHBAR_DESKTOP_WIDTH : BUTTON_SIZE};
    z-index: ${layer.front};
    :hover {
        ${({ hasValue, theme }) =>
            hasValue ? activeInputStyling(theme) : focusedInputStyling(theme)};
    }
    :focus,
    :focus-within {
        ${({ theme }) => activeInputStyling(theme)};
        ${MagnifyingGlass} {
            color: ${({ theme }) => theme.colorMap.devWhite};
        }
        ${GoButton} {
            background-color: ${({ theme }) => theme.colorMap.greyLightOne};
        }
    }
    ${({ hasValue, theme }) => hasValue && activeInputStyling(theme)};
    @media ${screenSize.upToLarge} {
        right: ${size.xsmall};
        ${({ isExpanded }) =>
            isExpanded ? `right: ${size.default}` : 'right: 0'};
    }
    @media ${screenSize.upToSmall} {
        top: 0;
        height: ${({ isExpanded, isSearching }) =>
            isExpanded && isSearching
                ? '100%'
                : isExpanded
                ? SEARCHBAR_HEIGHT
                : size.medium};
        width: ${({ isExpanded }) => (isExpanded ? '100%' : BUTTON_SIZE)};
        ${({ isExpanded }) => isExpanded && 'left: 0'};
        :focus,
        :focus-within {
            ${StyledTextInput} {
                div > input {
                    border: none;
                }
            }
        }
    }
`;

const limitSearchResults = (results, limit) => results.slice(0, limit);

const Searchbar = ({ isExpanded, setIsExpanded }) => {
    const [value, setValue] = useState('');
    const [searchEvent, setSearchEvent] = useState(null);
    const [reportEvent, setReportEvent] = useState(null);
    const [searchResults, setSearchResults] = useState([]);
    const [isFocused, setIsFocused] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const searchContainerRef = useRef(null);
    const isMobile = useMedia(screenSize.upToSmall);
    // A user is searching if the text input is focused and it is not empty
    const isSearching = useMemo(() => !!value && isFocused, [isFocused, value]);
    // Focus Handlers
    const onExpand = useCallback(() => setIsExpanded(true), [setIsExpanded]);
    const onFocus = useCallback(() => {
        if (!isFocused) {
            reportAnalytics('SearchFocus', {});
        }
        setIsFocused(true);
    }, [isFocused]);

    // Focus when slash pressed
    const onSlashKeyDown = useCallback(
        e => {
            const { key, keyCode } = e;
            if (key === '/' || keyCode === SLASH_KEY) {
                e.preventDefault();
                onExpand();
                onFocus();
            }
        },
        [onExpand, onFocus]
    );

    // Add event listener using hook
    useEventListener('keydown', onSlashKeyDown);

    // Remove focus and close searchbar if it disrupts the navbar
    const onBlur = useCallback(() => {
        // Since this is tied to a document click off event, we want to be sure this is
        // really a blur and not just clicking outside of the searchbar
        if (isFocused) {
            reportAnalytics('SearchBlur', { query: value });
        }
        setIsFocused(false);
        // The parent controls whether a searchbar is expanded by default, so this may
        // have no effect where the searchbar should always be open
        setIsExpanded(false);
    }, [isFocused, setIsExpanded, value]);
    // Close the dropdown and remove focus when clicked outside
    useClickOutside(searchContainerRef, onBlur);
    const onClose = useCallback(() => setIsExpanded(false), [setIsExpanded]);

    const onSearchChange = useCallback(
        searchTerm => {
            setIsFocused(true);
            // Debounce any queued search event since the query has changed
            clearTimeout(searchEvent);
            clearTimeout(reportEvent);
            setValue(searchTerm);
            // The below useEffect will then run to query a new search since `value` was updated
        },
        [reportEvent, searchEvent]
    );

    // Update state on a new search query or filters
    const fetchNewSearchResults = useCallback(async () => {
        const results = await requestTextFilterResults(value);
        // On mobile, we do not limit search results
        const applyLimit = !isMobile;
        const limitedResults = applyLimit
            ? limitSearchResults(results, NUMBER_SEARCH_RESULTS)
            : results;
        // End loading animation
        setIsLoading(false);
        setSearchResults(limitedResults);
    }, [isMobile, value]);

    const reportSearchEvent = useCallback(() => {
        reportAnalytics('SearchQuery', { query: value });
    }, [value]);

    useEffect(() => {
        if (value) {
            // Start loading animation
            setIsLoading(true);
            // Set a timeout to trigger the search to avoid over-requesting
            setSearchEvent(
                setTimeout(fetchNewSearchResults, SEARCH_DELAY_TIME)
            );
            setReportEvent(
                setTimeout(reportSearchEvent, REPORT_SEARCH_DELAY_TIME)
            );
        }
    }, [fetchNewSearchResults, reportSearchEvent, value]);

    return (
        <div ref={searchContainerRef} style={{ position: 'relative' }}>
            <SearchbarContainer
                hasValue={!!value}
                isSearching={isSearching}
                isExpanded={isExpanded}
                onFocus={onFocus}
            >
                {isExpanded ? (
                    <SearchContext.Provider
                        value={{
                            isLoading,
                            searchContainerRef,
                            searchTerm: value,
                            shouldAutofocus: true,
                        }}
                    >
                        <ExpandedSearchbar
                            isFocused={isFocused}
                            onMobileClose={onClose}
                            onChange={onSearchChange}
                        />
                        {isSearching && (
                            <SearchDropdown results={searchResults} />
                        )}
                    </SearchContext.Provider>
                ) : (
                    <CondensedSearchbar onExpand={onExpand} />
                )}
            </SearchbarContainer>
        </div>
    );
};

export default Searchbar;
