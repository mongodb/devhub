import React from 'react';
import styled from '@emotion/styled';
import Icon from '@leafygreen-ui/icon';
import IconButton from '@leafygreen-ui/icon-button';
import { size } from '~components/dev-hub/theme';

// Defining as a styled component allows us to use as a selector in ExpandButton
const ExpandMagnifyingGlass = styled(Icon)``;

const ExpandButton = styled(IconButton)`
    background-color: none;
    background-image: none;
    border: none;
    border-radius: ${size.medium};
    box-shadow: none;
    color: ${({ theme }) => theme.colorMap.greyLightTwo};
    height: ${size.large};
    position: absolute;
    right: ${size.small};
    /* 32px button in a 36px container, 2px top gives equal spacing */
    top: 2px;
    width: ${size.large};
    z-index: 1;
    :hover,
    :focus {
        background-color: none;
        ${ExpandMagnifyingGlass} {
            color: ${({ theme }) => theme.colorMap.greyDarkTwo};
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
    <ExpandButton aria-label="Open MongoDB Docs Search" onClick={onExpand}>
        <ExpandMagnifyingGlass glyph="MagnifyingGlass" />
    </ExpandButton>
);

export default CondensedSearchbar;
