import React, { useState } from 'react';
import styled from '@emotion/styled-base';
import { css } from '@emotion/core';
import Tooltip from './tooltip';
import ListIcon from './list-icon';
import { P } from './text';
import Link from './link';
import { colorMap, size } from './theme';

const activeStyles = css`
    color: ${colorMap.devWhite};
    &:hover {
        color: ${colorMap.white};
    }
`;

const defaultStyles = css`
    &:hover {
        color: ${colorMap.devWhite};
    }
`;

const StyledItem = styled(Link)`
    padding: ${size.tiny} 0;
    text-decoration: none;
    ${({ active }) => active && activeStyles}
    ${({ active }) => !active && defaultStyles}
    &:last-of-type {
        padding-bottom: 0;
    }
    &:after {
        content: '';
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
                {contents.map(item => {
                    const isActive = item.to === activeItem ? 'true' : null;
                    return (
                        <li key={item.to}>
                            <StyledItem
                                active={isActive}
                                onClick={() => setActiveItem(item.to)}
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
