import React, { useContext } from 'react';
import { css } from '@emotion/core';
import styled from '@emotion/styled';
import TextInput from '@leafygreen-ui/text-input';
import { useSiteMetadata } from '~hooks/use-site-metadata';
import {
    colorMap,
    fontSize,
    screenSize,
    size,
} from '~components/dev-hub/theme';
import SearchContext from './SearchContext';

const SEARCHBAR_HEIGHT_OFFSET = '5px';

const activeTextBarStyling = css`
    background-color: ${colorMap.pageBackground};
    border: none;
`;

const StyledTextInput = styled(TextInput)`
    /* Curve the text input box and put padding around text for icons/buttons */
    div > input {
        border: 1px solid transparent;
        background-color: ${({ theme }) => theme.colorMap.pageBackground};
        border-radius: ${size.medium};
        color: ${({ theme }) => theme.colorMap.devWhite};
        /* 24 px for magnifying glass plus 16px margin */
        padding-left: 40px;
        padding-right: ${size.large};
        font-weight: 300;
        letter-spacing: 0.5px;
        transition: background-color 150ms ease-in;
        ::placeholder {
            color: ${({ theme }) => theme.colorMap.greyLightTwo};
        }
        @media ${screenSize.upToSmall} {
            border: none;
            :hover,
            :focus {
                border: none;
                box-shadow: none;
            }
        }
    }

    /* Remove blue border on focus */
    div > div:last-child {
        display: none;
    }
    > label {
        display: none;
    }

    @media ${screenSize.upToSmall} {
        background-color: ${({ theme }) => theme.colorMap.pageBackground};
        padding-bottom: ${size.tiny};
        div > input {
            /* Always have this element filled in for mobile */
            ${activeTextBarStyling}
            /* Switching font size on mobile allows us to prevent iOS Safari from zooming in */
      font-size: ${fontSize.default};
            padding-top: 2px;
        }
        /**
    On mobile, there is some space above the searchbar that is uncovered (on
      desktop this is taken care of by the navbar). Here we can block elements
      below from peeking through with a pseudoelement to cover this top space
    */
        :before {
            background-color: ${({ theme }) => theme.colorMap.pageBackground};
            bottom: 100%;
            content: '';
            position: absolute;
            top: -${SEARCHBAR_HEIGHT_OFFSET};
            width: 100%;
        }
    }
`;

const SearchWrapper = styled('span')`
    @media ${screenSize.upToSmall} {
        /* Putting this attribute on the input causes a DOM warning */
        ${({ isSearching }) =>
            isSearching && `box-shadow: 0 2px 2px 0 rgba(231,238,236,0.2);`}
    }
`;

const SearchTextInput = React.forwardRef(
    ({ isSearching, onChange, value, ...props }, ref) => {
        const { searchFilter, shouldAutofocus } = useContext(SearchContext);
        const { project } = useSiteMetadata();
        return (
            <SearchWrapper isSearching={isSearching}>
                <StyledTextInput
                    autoFocus={shouldAutofocus}
                    label="Search Docs"
                    onChange={onChange}
                    placeholder={'Search Articles...'}
                    ref={ref}
                    tabIndex="0"
                    value={value}
                    {...props}
                />
            </SearchWrapper>
        );
    }
);

// Also export the styled component for styled selector use
export { activeTextBarStyling, StyledTextInput };
export default SearchTextInput;
