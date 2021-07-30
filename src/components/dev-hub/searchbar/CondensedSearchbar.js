import React from 'react';
import styled from '@emotion/styled';
import Icon from '@leafygreen-ui/icon';
import IconButton from '@leafygreen-ui/icon-button';
import { screenSize, size } from '~components/dev-hub/theme';

const BUTTON_SIZE = size.medium;
// Defining as a styled component allows us to use as a selector in ExpandButton
const ExpandMagnifyingGlass = styled(Icon)``;

const ExpandButton = styled(IconButton)`
    background-color: ${({ theme }) => theme.colorMap.greyDarkThree};
    background-image: none;
    border: none;
    border-radius: ${size.medium};
    box-shadow: none;
    color: ${({ theme }) => theme.colorMap.greyLightTwo};
    height: ${BUTTON_SIZE};
    position: absolute;
    left: 0;
    top: 0;
    width: ${BUTTON_SIZE};
    z-index: 1;
    :hover,
    :focus {
        background-color: ${({ theme }) => theme.colorMap.greyDarkThree};
        ${ExpandMagnifyingGlass} {
            color: ${({ theme }) => theme.colorMap.devWhite};
            transition: color 150ms ease-in;
        }
    }
    :before {
        display: none;
    }
    :after {
        display: none;
    }
    @media ${screenSize.upToLarge} {
        color: ${({ theme }) => theme.colorMap.devWhite};
    }
`;

const CondensedSearchbar = ({ onExpand }) => (
    <ExpandButton
        aria-label="Open MongoDB Developer Search"
        data-test="Closed Searchbar Button"
        onClick={onExpand}
    >
        <ExpandMagnifyingGlass glyph="MagnifyingGlass" height="20" width="20" />
    </ExpandButton>
);

export default CondensedSearchbar;
