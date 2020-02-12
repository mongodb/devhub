import React, { useState } from 'react';
import styled from '@emotion/styled-base';
import { css } from '@emotion/core';
import Tooltip from './tooltip';
import ListIcon from './list-icon';
import { P } from './text';
import Link from './link';
import { animationSpeed, colorMap, size } from './theme';

const activeStyles = css`
    color: ${colorMap.white};
    font-weight: bold;
    &:hover,
    &:visited {
        color: ${colorMap.white};
    }
`;

const defaultStyles = css`
    &:hover {
        color: ${colorMap.devWhite};
        transition: color ${animationSpeed.fast} ease ${animationSpeed.fast};
    }
`;

const StyledItem = styled(Link)`
    &:visited {
        color: ${colorMap.greyLightTwo};
    }
    color: ${colorMap.greyLightTwo};
    padding: ${size.tiny} 0;
    text-decoration: none;
    ${({ isactive }) => (isactive ? activeStyles : defaultStyles)}
    &:after {
        content: '';
    }
    &:hover {
        transition: color ${animationSpeed.fast} ease ${animationSpeed.fast};
    }
    &:last-of-type {
        padding-bottom: 0;
    }
`;

const Contents = styled('ul')`
    list-style-type: none;
    margin: 0;
    padding: 0;
`;

/**
 * @param {Object<string, any>} props
 * @property {string} props.title
 * @property {object[]} props.contents
 */

const ContentsMenu = ({ title, contents = [] }) => {
    const [activeItem, setActiveItem] = useState(null);

    return (
        <Tooltip hasGradientBorder position={'right'} trigger={<ListIcon />}>
            <P bold>{title}</P>
            <Contents>
                {contents.map((item, index) => {
                    const isactive = item.to === activeItem ? 'true' : null;
                    return (
                        <li key={item.to}>
                            <StyledItem
                                tabIndex="0"
                                isactive={isactive}
                                onClick={() => setActiveItem(item.to)}
                                onKeyPress={() => setActiveItem(item.to)}
                                to={item.to}
                            >
                                {item.title}
                            </StyledItem>
                        </li>
                    );
                })}
            </Contents>
        </Tooltip>
    );
};

export default ContentsMenu;
