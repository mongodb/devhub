import React from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/core';
import ClientOnly from '../ClientOnly';
import { size, fontSize, screenSize } from './theme';
import { P } from './text';

const TAB_WIDTH = '136px';

const Tab = styled('div')`
    border-bottom: 1px solid ${({ theme }) => theme.colorMap.greyDarkOne};
    display: flex;
    justify-content: space-between;
    @media ${screenSize.upToMedium} {
        display: block;
    }
`;

const activeStyles = theme => css`
    border-bottom-color: ${theme.colorMap.darkGreen};
    color: ${theme.colorMap.devWhite};
`;

const TabButton = styled('button')`
    border: none;
    background-color: inherit;
    border-bottom: 3px solid transparent;
    color: ${({ theme }) => theme.colorMap.greyDarkOne};
    cursor: pointer;
    font-size: ${fontSize.default};
    font-family: 'Fira Mono';
    &:hover {
        color: ${({ theme }) => theme.colorMap.devWhite};
    }
    outline: none;
    padding: ${size.small} ${size.mediumLarge};
    transition: 0.3s;
    width: ${TAB_WIDTH};
    ${({ isActive, theme }) => isActive && activeStyles(theme)}
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
                data-test={`tab-${item}`}
                key={item}
                isActive={isActive}
                onClick={() => handleClick(item)}
            >
                <P collapse>{item}</P>
            </TabButton>
        );
    });

const Tabs = ({ activeItem, className, handleClick, leftTabs, rightTabs }) => (
    <ClientOnly>
        <Tab data-test="tabs" className={className}>
            <div>{mapTabTextToButton(leftTabs, activeItem, handleClick)}</div>
            <div>{mapTabTextToButton(rightTabs, activeItem, handleClick)}</div>
        </Tab>
    </ClientOnly>
);

export default Tabs;
