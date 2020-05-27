import React, { useState } from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/core';
import ControlledTooltip from './controlled-tooltip';
import ListIcon from './icons/list-icon';
import { H5, P } from './text';
import Link from './link';
import { animationSpeed, darkTheme, size } from './theme';
import { formatText } from '../../utils/format-text';
import HoverTooltip from './hover-tooltip';

const StyledListIcon = styled(ListIcon)`
    &:hover {
        g {
            path,
            circle {
                fill: ${darkTheme.colorMap.devWhite};
            }
        }
    }
`;

const activeStyles = css`
    color: ${darkTheme.colorMap.devWhite};
    font-weight: bold;
    &:hover,
    &:visited {
        color: ${darkTheme.colorMap.devWhite};
    }
`;

const defaultStyles = css`
    &:hover {
        color: ${darkTheme.colorMap.devWhite};
        transition: color ${animationSpeed.fast};
    }
`;
const StyledLink = styled(Link)`
    &:visited {
        color: ${darkTheme.colorMap.greyLightTwo};
    }
    color: ${darkTheme.colorMap.greyLightTwo};
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
    const [isOpen, setIsOpen] = useState(false);
    const handleClick = id => {
        setIsOpen(false);
        setActiveItem(id);
    };
    return (
        <ControlledTooltip
            hasGradientBorder
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            position={'right'}
            trigger={
                <HoverTooltip
                    trigger={
                        <StyledListIcon
                            data-test="contents-tooltip"
                            {...props}
                        />
                    }
                    text="Contents"
                    {...props}
                />
            }
            maxWidth={400}
        >
            <H5 bold>{title}</H5>
            <Contents data-test="contents-list">
                {headingNodes.map(({ id, title }) => {
                    const isactive = id === activeItem ? 'true' : null;
                    return (
                        <StyledItem key={id}>
                            <StyledLink
                                tabIndex="0"
                                isactive={isactive}
                                onClick={() => handleClick(id)}
                                onKeyPress={() => handleClick(id)}
                                href={`#${id}`}
                            >
                                <P>{formatText(title)}</P>
                            </StyledLink>
                        </StyledItem>
                    );
                })}
            </Contents>
        </ControlledTooltip>
    );
};

export default ContentsMenu;
