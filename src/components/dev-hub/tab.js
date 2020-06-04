import React from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/core';
import { colorMap, size, fontSize, screenSize } from './theme';
import { P } from './text';

const TAB_WIDTH = '136px';

const Tab = styled('div')`
    border-bottom: 1px solid ${colorMap.greyDarkOne};
    display: flex;
    justify-content: space-between;
    @media ${screenSize.upToMedium} {
        display: block;
    }
`;

const activeStyles = css`
    border-bottom-color: ${colorMap.darkGreen};
    color: ${colorMap.devWhite};
`;

const TabButton = styled('button')`
    border: none;
    background-color: inherit;
    border-bottom: 3px solid transparent;
    color: ${colorMap.greyDarkOne};
    cursor: pointer;
    font-size: ${fontSize.default};
    font-family: 'Fira Mono';
    &:hover {
        color: ${colorMap.devWhite};
    }
    outline: none;
    padding: ${size.small} ${size.mediumLarge};
    transition: 0.3s;
    width: ${TAB_WIDTH};
    ${({ isActive }) => isActive && activeStyles}
    @media ${screenSize.upToMedium} {
        display: block;
        margin: 0 auto;
    }
`;

const mapTabTextToButton = (textList, activeItem, handleClick) =>
    textList.map(item => {
        const isActive = item === activeItem;
        return (
            <TabButton
                key={item}
                isActive={isActive}
                onClick={() => handleClick(item)}
            >
                <P collapse>{item}</P>
            </TabButton>
        );
    });

export default ({
    activeItem,
    className,
    handleClick,
    leftTabs,
    rightTabs,
}) => (
    <Tab className={className}>
        <div>{mapTabTextToButton(leftTabs, activeItem, handleClick)}</div>
        <div>{mapTabTextToButton(rightTabs, activeItem, handleClick)}</div>
    </Tab>
);
