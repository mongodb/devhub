import React from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/core';
import { colorMap, size, fontSize } from './theme';
import { P } from '../dev-hub/text';

const Tab = styled('div')`
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid ${colorMap.greyDarkOne};
`;

const activeStyles = css`
    color: ${colorMap.devWhite};
    border-bottom-color: ${colorMap.darkGreen};
`;

const defaultStyles = css`
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
    padding-top: ${size.micro};
    padding-bottom: ${size.medium};
    padding-left: ${size.mediumLarge};
    padding-right: ${size.mediumLarge};
    border-bottom: 3px solid transparent;

    font-size: ${fontSize.default};
    color: ${colorMap.greyDarkOne};
    font-family: 'Fira Mono';

    ${({ isActive }) => (isActive ? activeStyles : defaultStyles)}
`;

export default ({ handleClick, leftTabs, rightTabs, activeItem }) => {
    return (
        <Tab>
            <div>
                {leftTabs.map(item => {
                    const isActive = item === activeItem;
                    return (
                        <TabButton
                            key={item}
                            isActive={isActive}
                            onClick={() => handleClick(item)}
                        >
                            {item}
                        </TabButton>
                    );
                })}
            </div>

            <div>
                {rightTabs.map(item => {
                    const isActive = item === activeItem;
                    return (
                        <TabButton
                            key={item}
                            isActive={isActive}
                            onClick={() => handleClick(item)}
                        >
                            {item}
                        </TabButton>
                    );
                })}
            </div>
        </Tab>
    );
};
