import React, { useState } from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/core';
import Tooltip from './tooltip';
import ListIcon from './icons/list-icon';
import { P } from './text';
import Link from './link';
import { animationSpeed, colorMap, size } from './theme';
import { getNestedValue } from '../../utils/get-nested-value';
import { formatText } from '../../utils/format-text';

const StyledListIcon = styled(ListIcon)`
    &:hover {
        g {
            path,
            circle {
                fill: ${colorMap.devWhite};
            }
        }
    }
`;

const activeStyles = css`
    color: ${colorMap.devWhite};
    font-weight: bold;
    &:hover,
    &:visited {
        color: ${colorMap.devWhite};
    }
`;

const defaultStyles = css`
    &:hover {
        color: ${colorMap.devWhite};
        transition: color ${animationSpeed.fast} ease ${animationSpeed.fast};
    }
`;
const StyledLink = styled(Link)`
    &:visited {
        color: ${colorMap.greyLightTwo};
    }
    color: ${colorMap.greyLightTwo};
    padding: ${size.small} 0;
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
const StyledItem = styled('li')`
    margin: ${size.small} 0;
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

const ContentsMenu = ({ title, headingNodes, ...props }) => {
    const [activeItem, setActiveItem] = useState(null);

    return (
        <Tooltip
            hasGradientBorder
            position={'right'}
            trigger={<StyledListIcon {...props} />}
            maxWidth={400}
        >
            <P bold>{title}</P>
            <Contents>
                {headingNodes.map(({ id, title }) => {
                    const isactive = id === activeItem ? 'true' : null;
                    return (
                        <StyledItem key={id}>
                            <StyledLink
                                tabIndex="0"
                                isactive={isactive}
                                onClick={() => setActiveItem(id)}
                                onKeyPress={() => setActiveItem(id)}
                                href={`#${id}`}
                            >
                                {formatText(title)}
                            </StyledLink>
                        </StyledItem>
                    );
                })}
            </Contents>
        </Tooltip>
    );
};

export default ContentsMenu;
