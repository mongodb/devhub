import React from 'react';
import styled from '@emotion/styled';
import Icon from '@leafygreen-ui/icon';
import IconButton from '@leafygreen-ui/icon-button';
import { size } from '~components/dev-hub/theme';

// Defining as a styled component allows us to use as a selector in ExpandButton
const ExpandMagnifyingGlass = styled(Icon)``;

const ExpandButton = styled(IconButton)`
    background-color: ${({ theme }) => theme.colorMap.greyDarkThree};
    background-image: none;
    border: none;
    border-radius: ${size.medium};
    box-shadow: none;
    color: ${({ theme }) => theme.colorMap.greyLightTwo};
    height: 20px;
    position: absolute;
    right: 20px;
    /* 20px button in a 36px container, 10px top gives equal spacing */
    top: 8px;
    width: 20px;
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
`;

const CondensedSearchbar = ({ onExpand }) => (
    <ExpandButton aria-label="Open MongoDB Developer Search" onClick={onExpand}>
        <ExpandMagnifyingGlass glyph="MagnifyingGlass" height="20" width="20" />
    </ExpandButton>
);

export default CondensedSearchbar;
