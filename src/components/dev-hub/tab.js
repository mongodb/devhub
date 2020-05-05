import React from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/core';
import { colorMap, size, fontSize } from './theme';
import { P } from './text';

const Tab = styled('div')`
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid ${colorMap.greyDarkOne};
`;

const activeStyles = css`
    color: ${colorMap.devWhite};
    border-bottom-color: ${colorMap.darkGreen};
`;

const hoverStyle = css`
    &:hover {
        color: ${colorMap.devWhite};
    }
`;

const TabButton = styled('button')`
    border: none;
    outline: none;
    cursor: pointer;
    transition: 0.3s;
    background-color: inherit;
    width: 136px;
    padding: ${size.micro} ${size.medium} ${size.mediumLarge}
        ${size.mediumLarge};
    border-bottom: 3px solid transparent;

    font-size: ${fontSize.default};
    color: ${colorMap.greyDarkOne};
    font-family: 'Fira Mono';

    ${({ isActive }) => isActive && activeStyles}
`;

const mapTabTextToButton = (textList, activeItem, handleClick) => {
    return textList.map(item => {
        const isActive = item === activeItem;
        return (
            <TabButton
                key={item}
                isActive={isActive}
                onClick={() => handleClick(item)}
                style={hoverStyle}
            >
                <P collapse>{item}</P>
            </TabButton>
        );
    });
};

export default ({ handleClick, leftTabs, rightTabs, activeItem }) => {
    return (
        <Tab>
            <div>{mapTabTextToButton(leftTabs, activeItem, handleClick)}</div>

            <div>{mapTabTextToButton(rightTabs, activeItem, handleClick)}</div>
        </Tab>
    );
};
